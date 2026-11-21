import { Locator, Page } from "@playwright/test";
import { OrangeHRMPimPage } from "./OrangeHRMPimPage";

export class OrangeHRMDashboardPage {
  private readonly page: Page;

  // Locators
  private readonly dashboardHeading: Locator;
  private readonly pimLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.dashboardHeading = page.getByRole("heading", {
      name: "Dashboard",
      exact: true,
    });
    this.pimLink = page.getByRole("link", { name: "PIM", exact: true });
  }

  /**
   * Waits for the dashboard after a successful sign-in.
   */
  async waitUntilDisplayed(): Promise<void> {
    await this.dashboardHeading.waitFor({ state: "visible" });
  }

  /**
   * Checks whether the dashboard is displayed.
   * @returns Promise<boolean> - true when the dashboard heading is visible
   */
  async isDashboardDisplayed(): Promise<boolean> {
    try {
      return await this.dashboardHeading.isVisible();
    } catch (error) {
      console.log(`Error checking OrangeHRM dashboard: ${error}`);
      return false;
    }
  }

  /**
   * Opens the PIM module.
   * @returns Promise<OrangeHRMPimPage> - the PIM page object
   */
  async openPimModule(): Promise<OrangeHRMPimPage> {
    await Promise.all([
      this.page.waitForURL(/\/pim\/viewEmployeeList$/),
      this.pimLink.click(),
    ]);
    const pimPage = new OrangeHRMPimPage(this.page);
    await pimPage.waitUntilDisplayed();
    return pimPage;
  }
}
