import { test, expect } from "@playwright/test";
import TestData from "../../data/test-data";
import { env } from "node:process";
import fileHelper from "../helpers/file-helper";
import path from "path";

//const makeApptTestData = TestData.makeAppointmentTestData() // - > Returns 3 objects of test data
const csvFilePath = path.resolve(`${process.cwd()}/data/functional/make-aptmnt-test-data.csv`);
const makeApptTestData = fileHelper.readCSV(csvFilePath);

//Access the data
for(const apptData of makeApptTestData){
    test.describe("Make appointment", () => {
      test.beforeEach("Login with valid cred", async ({ page }) => {
      await page.goto("https://katalon-demo-cura.herokuapp.com/");

      //2. Click on the make appointment
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await expect(page.getByText("Please login to make")).toBeVisible();

      //successfull login
      await page.getByLabel("Username").fill("John Doe");
      await page.getByLabel("Password").fill("ThisIsNotAPassword");
      await page.getByRole("button", { name: "Login" }).click();


      //get login cookies
      const loginCookies = await page.context().cookies()///check on this
      process.env.LOGIN_COOKIES = JSON.stringify(loginCookies)
      //assert a text
      await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  //test goes here
  test(`${apptData.testId}-${apptData.facility}-${apptData.hcp}-${apptData.visitDate}: should make an appointment with non-default values`,async({page}, testInfo) => {
      //testInfo - has the property of config

      //console.log(`>> current config \n: ${JSON.stringify(testInfo.config)}`);

      //Access the login cookies 
      console.log(`>>Loginn cookies: ${process.env.LOGIN_COOKIES}`)
      //dropdown
      await page.getByLabel("Facility").selectOption(apptData.facility);

      //chechkbox
      await page.getByText("Apply for hospital readmission").click();

      //radiobutton
      await page.getByText(apptData.hcp).click();

      //date field input box
      await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
      let data = await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill(apptData.visitDate);
      console.log(data);
      await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");

      //multiline comment
      await page.getByRole("textbox", { name: "Comment" }).click();
      await page
        .getByRole("textbox", { name: "Comment" })
        .fill("This is a multiline comments capturedd by playwright codegen");

      //button
      await page.getByRole("button", { name: "Book Appointment" }).click();

      //assertions
      await expect(page.locator("h2")).toContainText("Appointment Confirmation");
      await expect(
        page.getByRole("link", { name: "Go to Homepage" }),
      ).toBeVisible();
  });

  //moretest goes here

  
});

}

