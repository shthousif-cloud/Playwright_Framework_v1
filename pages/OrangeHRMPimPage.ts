import { Locator, Page } from "@playwright/test";
import { OrangeHRMAddEmployeePage } from "./OrangeHRMAddEmployeePage";

export class OrangeHRMPimPage {
  private readonly page: Page;

  // Locators
  private readonly pimHeading: Locator;
  private readonly addEmployeeLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.pimHeading = page.getByRole("heading", {
      name: "PIM",
      exact: true,
    });
    this.addEmployeeLink = page.getByRole("link", {
      name: "Add Employee",
      exact: true,
    });
  }

  /**
   * Waits for the PIM module after navigation.
   */
  async waitUntilDisplayed(): Promise<void> {
    await this.pimHeading.waitFor({ state: "visible" });
  }

  /**
   * Checks whether the PIM module is displayed.
   * @returns Promise<boolean> - true when the PIM heading is visible
   */
  async isPimModuleDisplayed(): Promise<boolean> {
    try {
      return await this.pimHeading.isVisible();
    } catch (error) {
      console.log(`Error checking OrangeHRM PIM module: ${error}`);
      return false;
    }
  }

  /**
   * Opens the Add Employee form.
   * @returns Promise<OrangeHRMAddEmployeePage> - the Add Employee page object
   */
  async openAddEmployee(): Promise<OrangeHRMAddEmployeePage> {
    await Promise.all([
      this.page.waitForURL(/\/pim\/addEmployee$/),
      this.addEmployeeLink.click(),
    ]);
    const addEmployeePage = new OrangeHRMAddEmployeePage(this.page);
    await addEmployeePage.waitUntilDisplayed();
    return addEmployeePage;
  }
}
