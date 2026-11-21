# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\user-registration.spec.ts >> Third user registration flow @master @sanity @regression @web
- Location: tests\web\user-registration.spec.ts:15:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('link', { name: 'My Account', exact: true }).first()

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | 
  3  | export class HomePage {
  4  |   private readonly page: Page;
  5  | 
  6  |   // Locators
  7  |   private readonly myAccountMenu: Locator;
  8  |   private readonly registerLink: Locator;
  9  |   private readonly accountDropdown: Locator;
  10 | 
  11 |   constructor(page: Page) {
  12 |     this.page = page;
  13 | 
  14 |     // Initialize locators with CSS selectors
  15 |     this.myAccountMenu = page.getByRole("link", {
  16 |       name: "My Account",
  17 |       exact: true,
  18 |     }).first();
  19 |     this.registerLink = page.getByRole("link", {
  20 |       name: "Register",
  21 |       exact: true,
  22 |     });
  23 |     this.accountDropdown = page.locator("#top-links .dropdown-menu");
  24 |   }
  25 | 
  26 |   /**
  27 |    * Opens the My Account navigation menu.
  28 |    */
  29 |   async openMyAccountMenu(): Promise<void> {
> 30 |     await this.myAccountMenu.click();
     |                              ^ Error: locator.click: Target page, context or browser has been closed
  31 |   }
  32 | 
  33 |   /**
  34 |    * Opens the customer registration page from the account menu.
  35 |    */
  36 |   async clickRegister(): Promise<void> {
  37 |     await this.registerLink.click();
  38 |   }
  39 | 
  40 |   /**
  41 |    * Opens the authenticated customer's account dashboard.
  42 |    */
  43 |   async openAccountDashboard(): Promise<void> {
  44 |     await this.openMyAccountMenu();
  45 |     await this.accountDropdown
  46 |       .getByRole("link", { name: "My Account", exact: true })
  47 |       .click();
  48 |   }
  49 | }
  50 | 
```