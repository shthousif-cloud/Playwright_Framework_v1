/**
 * Test Case: Log in to OrangeHRM
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Sign in to OrangeHRM
 * 2) Verify that the dashboard is displayed
 */
import { test, expect } from "../../fixtures/pageFixtures";
import { OrangeHRMDashboardPage } from "../../pages/OrangeHRMDashboardPage";
import { Helper } from "../../utils/helper";

test(
  "OrangeHRM login flow @master @sanity @regression @web",
  async ({ orangeHrmLoginPage }) => {
    const { username, password } = Helper.getOrangeHRMLoginDetails();
    let dashboardPage: OrangeHRMDashboardPage;

    await test.step("1) Sign in to OrangeHRM", async () => {
      dashboardPage = await orangeHrmLoginPage.login(username, password);
    });

    await test.step("2) Verify that the dashboard is displayed", async () => {
      expect(await dashboardPage.isDashboardDisplayed()).toBeTruthy();
    });

    console.log("✅ OrangeHRM login completed successfully.");
  },
);
