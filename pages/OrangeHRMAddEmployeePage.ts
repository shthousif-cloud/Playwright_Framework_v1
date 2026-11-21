import { Locator, Page } from "@playwright/test";
import { OrangeHRMEmployeeProfilePage } from "./OrangeHRMEmployeeProfilePage";

export class OrangeHRMAddEmployeePage {
  private readonly page: Page;

  // Locators
  private readonly addEmployeeHeading: Locator;
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.addEmployeeHeading = page.getByRole("heading", {
      name: "Add Employee",
      exact: true,
    });
    this.firstNameField = page.getByRole("textbox", { name: "First Name" });
    this.lastNameField = page.getByRole("textbox", { name: "Last Name" });
    this.saveButton = page.getByRole("button", {
      name: "Save",
      exact: true,
    });
  }

  /**
   * Waits for the Add Employee form after navigation.
   */
  async waitUntilDisplayed(): Promise<void> {
    await this.addEmployeeHeading.waitFor({ state: "visible" });
  }

  /**
   * Adds an employee using the supplied name.
   * @param firstName - Employee first name
   * @param lastName - Employee last name
   * @returns Promise<OrangeHRMEmployeeProfilePage> - the profile page object
   */
  async addEmployee(
    firstName: string,
    lastName: string,
  ): Promise<OrangeHRMEmployeeProfilePage> {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.saveButton.click();
    const employeeProfilePage = new OrangeHRMEmployeeProfilePage(this.page);
    await employeeProfilePage.waitUntilDisplayed();
    return employeeProfilePage;
  }
}
