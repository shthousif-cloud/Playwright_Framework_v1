/**
 * Test Case: Register a third OpenCart customer
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Open the application and navigate to My Account > Register
 * 2) Complete and submit the registration form with unique customer details
 * 3) Verify the account-created confirmation
 * 4) Verify the new account is available from My Account navigation
 */
import { test, expect } from "../../fixtures/pageFixtures";
import { RandomDataUtil } from "../../utils/dataGenerator";

test(
  "Third user registration flow @master @sanity @regression @web",
  async ({ homePage, registerPage, accountSuccessPage, myAccountPage }) => {
    const registrationData = {
      firstName: RandomDataUtil.getFirstName(),
      lastName: RandomDataUtil.getLastName(),
      email: RandomDataUtil.getEmail().replace("@", `${Date.now()}@`),
      telephone: RandomDataUtil.getPhoneNumber(),
      password: RandomDataUtil.getPassword(14),
    };

    await test.step("1) Navigate to My Account > Register", async () => {
      await homePage.openMyAccountMenu();
      await homePage.clickRegister();
    });

    await test.step("2) Verify and complete the registration form", async () => {
      expect(await registerPage.isRegistrationPageDisplayed()).toBeTruthy();
      await registerPage.register(registrationData);
    });

    await test.step("3) Verify the account-created confirmation", async () => {
      expect(
        await accountSuccessPage.isAccountCreatedConfirmationDisplayed(),
      ).toBeTruthy();
    });

    await test.step(
      "4) Verify the new account is available through account navigation",
      async () => {
        await homePage.openAccountDashboard();
        expect(await myAccountPage.isAccountDashboardDisplayed()).toBeTruthy();
      },
    );

    console.log("✅ Customer registration completed successfully.");
  },
);
