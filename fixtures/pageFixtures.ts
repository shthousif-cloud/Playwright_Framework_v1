import dotenv from "dotenv";
import { test as base } from "@playwright/test";
import { AccountSuccessPage } from "../pages/AccountSuccessPage";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { RegisterPage } from "../pages/RegisterPage";
import { OrangeHRMLoginPage } from "../pages/OrangeHRMLoginPage";
import { OrangeHRMDashboardPage } from "../pages/OrangeHRMDashboardPage";
import { OrangeHRMPimPage } from "../pages/OrangeHRMPimPage";
import { OrangeHRMAddEmployeePage } from "../pages/OrangeHRMAddEmployeePage";
import { OrangeHRMEmployeeProfilePage } from "../pages/OrangeHRMEmployeeProfilePage";

dotenv.config();

const appUrl = process.env.WEB_APP_URL;
const orangeHrmAppUrl = process.env.ORANGEHRM_APP_URL;

if (!appUrl) {
  throw new Error("WEB_APP_URL must be set to run web tests.");
}

type PageFixtures = {
  homePage: HomePage;
  registerPage: RegisterPage;
  accountSuccessPage: AccountSuccessPage;
  myAccountPage: MyAccountPage;
  orangeHrmLoginPage: OrangeHRMLoginPage;
  orangeHrmDashboardPage: OrangeHRMDashboardPage;
  orangeHrmPimPage: OrangeHRMPimPage;
  orangeHrmAddEmployeePage: OrangeHRMAddEmployeePage;
  orangeHrmEmployeeProfilePage: OrangeHRMEmployeeProfilePage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await page.goto(appUrl);
    await use(new HomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  accountSuccessPage: async ({ page }, use) => {
    await use(new AccountSuccessPage(page));
  },
  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },
  orangeHrmLoginPage: async ({ page }, use) => {
    if (!orangeHrmAppUrl) {
      throw new Error("ORANGEHRM_APP_URL must be set to run OrangeHRM tests.");
    }
    await page.goto(orangeHrmAppUrl);
    await use(new OrangeHRMLoginPage(page));
  },
  orangeHrmDashboardPage: async ({ page }, use) => {
    await use(new OrangeHRMDashboardPage(page));
  },
  orangeHrmPimPage: async ({ page }, use) => {
    await use(new OrangeHRMPimPage(page));
  },
  orangeHrmAddEmployeePage: async ({ page }, use) => {
    await use(new OrangeHRMAddEmployeePage(page));
  },
  orangeHrmEmployeeProfilePage: async ({ page }, use) => {
    await use(new OrangeHRMEmployeeProfilePage(page));
  },
});

test.afterEach(async ({ page, context }) => {
  if (!page.isClosed()) {
    await page.close();
  }
  await context.close();
});

export { expect } from "@playwright/test";
