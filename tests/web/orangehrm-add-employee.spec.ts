/**
 * Test Case: Add an employee in OrangeHRM
 *
 * Tags: @master @sanity @regression @web @end-to-end
 *
 * Steps:
 * 1) Sign in to OrangeHRM
 * 2) Verify the dashboard
 * 3) Navigate to PIM > Add Employee
 * 4) Add the employee
 * 5) Verify the employee profile and name
 */
import { test, expect } from "../../fixtures/pageFixtures";
import { OrangeHRMDashboardPage } from "../../pages/OrangeHRMDashboardPage";
import { OrangeHRMPimPage } from "../../pages/OrangeHRMPimPage";
import { OrangeHRMAddEmployeePage } from "../../pages/OrangeHRMAddEmployeePage";
import { OrangeHRMEmployeeProfilePage } from "../../pages/OrangeHRMEmployeeProfilePage";
import { Helper } from "../../utils/helper";

test(
  "OrangeHRM user addition flow @master @sanity @regression @web @end-to-end",
  async ({ orangeHrmLoginPage }) => {
    test.setTimeout(90_000);

    const { username, password } = Helper.getOrangeHRMLoginDetails();
    const { firstName, lastName } = Helper.getOrangeHRMEmployeeDetails();
    const fullName = `${firstName} ${lastName}`;
    let dashboardPage: OrangeHRMDashboardPage;
    let pimPage: OrangeHRMPimPage;
    let addEmployeePage: OrangeHRMAddEmployeePage;
    let employeeProfilePage: OrangeHRMEmployeeProfilePage;

    await test.step("1) Sign in to OrangeHRM", async () => {
      dashboardPage = await orangeHrmLoginPage.login(username, password);
    });

    await test.step("2) Verify the dashboard is displayed", async () => {
      expect(await dashboardPage!.isDashboardDisplayed()).toBeTruthy();
    });

    await test.step("3) Navigate to PIM > Add Employee", async () => {
      pimPage = await dashboardPage!.openPimModule();
      expect(await pimPage.isPimModuleDisplayed()).toBeTruthy();
      addEmployeePage = await pimPage.openAddEmployee();
    });

    await test.step("4) Add the employee", async () => {
      employeeProfilePage = await addEmployeePage!.addEmployee(
        firstName,
        lastName,
      );
    });

    await test.step("5) Verify the employee profile and name", async () => {
      expect(
        await employeeProfilePage!.isEmployeeProfileDisplayed(),
      ).toBeTruthy();
      expect(
        await employeeProfilePage!.isEmployeeNameDisplayed(fullName),
      ).toBeTruthy();
    });

    console.log("✅ OrangeHRM employee creation completed successfully.");
  },
);
