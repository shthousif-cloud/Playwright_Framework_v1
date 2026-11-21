# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\user-registration.spec.ts >> User registration flow @master @sanity @regression @web
- Location: tests\web\user-registration.spec.ts:15:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/upload/
Call log:
  - navigating to "http://localhost/opencart/upload/", waiting until "load"

```

# Test source

```ts
  1  | import dotenv from "dotenv";
  2  | import { test as base } from "@playwright/test";
  3  | import { AccountPage } from "../pages/AccountPage";
  4  | import { HomePage } from "../pages/HomePage";
  5  | import { RegisterPage } from "../pages/RegisterPage";
  6  | 
  7  | dotenv.config();
  8  | 
  9  | const appUrl = process.env.WEB_APP_URL;
  10 | 
  11 | if (!appUrl) {
  12 |   throw new Error("WEB_APP_URL must be set to run web tests.");
  13 | }
  14 | 
  15 | type PageFixtures = {
  16 |   homePage: HomePage;
  17 |   registerPage: RegisterPage;
  18 |   accountPage: AccountPage;
  19 | };
  20 | 
  21 | export const test = base.extend<PageFixtures>({
  22 |   homePage: async ({ page }, use) => {
> 23 |     await page.goto(appUrl);
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/upload/
  24 |     await use(new HomePage(page));
  25 |   },
  26 |   registerPage: async ({ page }, use) => {
  27 |     await use(new RegisterPage(page));
  28 |   },
  29 |   accountPage: async ({ page }, use) => {
  30 |     await use(new AccountPage(page));
  31 |   },
  32 | });
  33 | 
  34 | test.afterEach(async ({ page, context }) => {
  35 |   if (!page.isClosed()) {
  36 |     await page.close();
  37 |   }
  38 |   await context.close();
  39 | });
  40 | 
  41 | export { expect } from "@playwright/test";
  42 | 
```