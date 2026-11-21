# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web\orangehrm-add-employee.spec.ts >> OrangeHRM user addition flow @master @sanity @regression @web @end-to-end
- Location: tests\web\orangehrm-add-employee.spec.ts:20:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | /**
  2  |  * Test Case: Add an employee in OrangeHRM
  3  |  *
  4  |  * Tags: @master @sanity @regression @web @end-to-end
  5  |  *
  6  |  * Steps:
  7  |  * 1) Sign in to OrangeHRM
  8  |  * 2) Verify the dashboard
  9  |  * 3) Navigate to PIM > Add Employee
  10 |  * 4) Add the employee
  11 |  * 5) Verify the employee profile and name
  12 |  */
  13 | import { test, expect } from "../../fixtures/pageFixtures";
  14 | import { OrangeHRMDashboardPage } from "../../pages/OrangeHRMDashboardPage";
  15 | import { OrangeHRMPimPage } from "../../pages/OrangeHRMPimPage";
  16 | import { OrangeHRMAddEmployeePage } from "../../pages/OrangeHRMAddEmployeePage";
  17 | import { OrangeHRMEmployeeProfilePage } from "../../pages/OrangeHRMEmployeeProfilePage";
  18 | import { Helper } from "../../utils/helper";
  19 | 
  20 | test(
  21 |   "OrangeHRM user addition flow @master @sanity @regression @web @end-to-end",
  22 |   async ({ orangeHrmLoginPage }) => {
  23 |     test.setTimeout(90_000);
  24 | 
  25 |     const { username, password } = Helper.getOrangeHRMLoginDetails();
  26 |     const { firstName, lastName } = Helper.getOrangeHRMEmployeeDetails();
  27 |     const fullName = `${firstName} ${lastName}`;
  28 |     let dashboardPage: OrangeHRMDashboardPage;
  29 |     let pimPage: OrangeHRMPimPage;
  30 |     let addEmployeePage: OrangeHRMAddEmployeePage;
  31 |     let employeeProfilePage: OrangeHRMEmployeeProfilePage;
  32 | 
  33 |     await test.step("1) Sign in to OrangeHRM", async () => {
  34 |       dashboardPage = await orangeHrmLoginPage.login(username, password);
  35 |     });
  36 | 
  37 |     await test.step("2) Verify the dashboard is displayed", async () => {
  38 |       expect(await dashboardPage!.isDashboardDisplayed()).toBeTruthy();
  39 |     });
  40 | 
  41 |     await test.step("3) Navigate to PIM > Add Employee", async () => {
  42 |       pimPage = await dashboardPage!.openPimModule();
  43 |       expect(await pimPage.isPimModuleDisplayed()).toBeTruthy();
  44 |       addEmployeePage = await pimPage.openAddEmployee();
  45 |     });
  46 | 
  47 |     await test.step("4) Add the employee", async () => {
  48 |       employeeProfilePage = await addEmployeePage!.addEmployee(
  49 |         firstName,
  50 |         lastName,
  51 |       );
  52 |     });
  53 | 
  54 |     await test.step("5) Verify the employee profile and name", async () => {
  55 |       expect(
  56 |         await employeeProfilePage!.isEmployeeProfileDisplayed(),
  57 |       ).toBeTruthy();
  58 |       expect(
  59 |         await employeeProfilePage!.isEmployeeNameDisplayed(fullName),
> 60 |       ).toBeTruthy();
     |         ^ Error: expect(received).toBeTruthy()
  61 |     });
  62 | 
  63 |     console.log("✅ OrangeHRM employee creation completed successfully.");
  64 |   },
  65 | );
  66 | 
```