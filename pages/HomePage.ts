import { Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;

  // Locators
  private readonly myAccountMenu: Locator;
  private readonly registerLink: Locator;
  private readonly accountDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.myAccountMenu = page.getByRole("link", {
      name: "My Account",
      exact: true,
    }).first();
    this.registerLink = page.getByRole("link", {
      name: "Register",
      exact: true,
    });
    this.accountDropdown = page.locator("#top-links .dropdown-menu");
  }

  /**
   * Opens the My Account navigation menu.
   */
  async openMyAccountMenu(): Promise<void> {
    await this.myAccountMenu.click();
  }

  /**
   * Opens the customer registration page from the account menu.
   */
  async clickRegister(): Promise<void> {
    await this.registerLink.click();
  }

  /**
   * Opens the authenticated customer's account dashboard.
   */
  async openAccountDashboard(): Promise<void> {
    await this.openMyAccountMenu();
    await this.accountDropdown
      .getByRole("link", { name: "My Account", exact: true })
      .click();
  }
}
