import { Locator, Page } from "@playwright/test";

export class AccountSuccessPage {
  private readonly page: Page;

  // Locators
  private readonly accountCreatedHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators with CSS selectors
    this.accountCreatedHeading = page.getByRole("heading", {
      name: "Your Account Has Been Created!",
      exact: true,
    });
  }

  /**
   * Checks whether OpenCart displays the account-created confirmation.
   * @returns Promise<boolean> - true when the confirmation heading is visible
   */
  async isAccountCreatedConfirmationDisplayed(): Promise<boolean> {
    try {
      return await this.accountCreatedHeading.isVisible();
    } catch (error) {
      console.log(`Error checking account-created confirmation: ${error}`);
      return false;
    }
  }
}
