import { Locator, Page } from "@playwright/test";

export class OrangeHRMEmployeeProfilePage {
  private readonly page: Page;

  // Locators
  private readonly personalDetailsHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.personalDetailsHeading = page.getByRole("heading", {
      name: "Personal Details",
      exact: true,
    });
  }

  /**
   * Waits for the employee profile after saving.
   */
  async waitUntilDisplayed(): Promise<void> {
    await this.personalDetailsHeading.waitFor({ state: "visible" });
  }

  /**
   * Checks whether the employee profile page is displayed.
   * @returns Promise<boolean> - true when Personal Details is visible
   */
  async isEmployeeProfileDisplayed(): Promise<boolean> {
    try {
      return await this.personalDetailsHeading.isVisible();
    } catch (error) {
      console.log(`Error checking OrangeHRM employee profile: ${error}`);
      return false;
    }
  }

  /**
   * Checks whether the supplied employee name is visible.
   * @param fullName - Employee's full name
   * @returns Promise<boolean> - true when the employee name is visible
   */
  async isEmployeeNameDisplayed(fullName: string): Promise<boolean> {
    try {
      await this.page
        .getByText(fullName, { exact: true })
        .waitFor({ state: "visible" });
      return true;
    } catch (error) {
      console.log(`Error checking OrangeHRM employee name: ${error}`);
      return false;
    }
  }
}
