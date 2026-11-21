import { Locator, Page } from "@playwright/test";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
}

export class RegisterPage {
  private readonly page: Page;

  // Locators
  private readonly pageHeading: Locator;
  private readonly firstNameField: Locator;
  private readonly lastNameField: Locator;
  private readonly emailField: Locator;
  private readonly telephoneField: Locator;
  private readonly passwordField: Locator;
  private readonly confirmPasswordField: Locator;
  private readonly privacyPolicyCheckbox: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.pageHeading = page.getByRole("heading", {
      name: "Register Account",
      exact: true,
    });
    this.firstNameField = page.locator("#input-firstname");
    this.lastNameField = page.locator("#input-lastname");
    this.emailField = page.locator("#input-email");
    this.telephoneField = page.locator("#input-telephone");
    this.passwordField = page.locator("#input-password");
    this.confirmPasswordField = page.locator("#input-confirm");
    this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
    this.continueButton = page.getByRole("button", {
      name: "Continue",
      exact: true,
    });
  }

  /**
   * Checks whether the registration page is displayed.
   * @returns Promise<boolean> - true when the registration heading is visible
   */
  async isRegistrationPageDisplayed(): Promise<boolean> {
    try {
      return await this.pageHeading.isVisible();
    } catch (error) {
      console.log(`Error checking registration page: ${error}`);
      return false;
    }
  }

  /**
   * Completes and submits the customer registration form.
   * @param registrationData - Customer details to submit
   */
  async register(registrationData: RegistrationData): Promise<void> {
    try {
      await this.firstNameField.fill(registrationData.firstName);
      await this.lastNameField.fill(registrationData.lastName);
      await this.emailField.fill(registrationData.email);
      await this.telephoneField.fill(registrationData.telephone);
      await this.passwordField.fill(registrationData.password);
      await this.confirmPasswordField.fill(registrationData.password);
      await this.privacyPolicyCheckbox.check();
      await this.continueButton.click();
    } catch (error) {
      console.log(`Error submitting customer registration: ${error}`);
      throw error;
    }
  }
}
