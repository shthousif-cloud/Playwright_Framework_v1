import { Locator, Page } from "@playwright/test";

export class MyAccountPage {
  private readonly page: Page;

  // Locators
  private readonly accountDashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.accountDashboardHeading = page.getByRole("heading", {
      name: "My Account",
      exact: true,
    });
  }

  /**
   * Checks whether the authenticated account dashboard is displayed.
   * @returns Promise<boolean> - true when the dashboard heading is visible
   */
  async isAccountDashboardDisplayed(): Promise<boolean> {
    try {
      return await this.accountDashboardHeading.isVisible();
    } catch (error) {
      console.log(`Error checking account dashboard: ${error}`);
      return false;
    }
  }
}
