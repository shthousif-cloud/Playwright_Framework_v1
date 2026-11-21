import { Locator, Page } from "@playwright/test";
import { OrangeHRMDashboardPage } from "./OrangeHRMDashboardPage";

export class OrangeHRMLoginPage {
  private readonly page: Page;

  // Locators
  private readonly usernameField: Locator;
  private readonly passwordField: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.usernameField = page.getByRole("textbox", { name: "Username" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", {
      name: "Login",
      exact: true,
    });
  }

  /**
   * Signs in to OrangeHRM.
   * @param username - OrangeHRM username
   * @param password - OrangeHRM password
   * @returns Promise<OrangeHRMDashboardPage> - the dashboard page object
   */
  async login(
    username: string,
    password: string,
  ): Promise<OrangeHRMDashboardPage> {
    try {
      await this.usernameField.fill(username);
      await this.passwordField.fill(password);
      await Promise.all([
        this.page.waitForURL(/\/dashboard\/index$/),
        this.loginButton.click(),
      ]);

      const dashboardPage = new OrangeHRMDashboardPage(this.page);
      await dashboardPage.waitUntilDisplayed();
      return dashboardPage;
    } catch (error) {
      console.log(`Error signing in to OrangeHRM: ${error}`);
      throw error;
    }
  }
}
