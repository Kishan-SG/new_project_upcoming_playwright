import { test, expect } from "@playwright/test";

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

    //assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  //test goes here
  test("test should make an appointment with non-default values", async ({ page }) => {
    //dropdown
    await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");

    //chechkbox
    await page.getByText("Apply for hospital readmission").click();

    //radiobutton
    await page.getByText("Medicaid").click();

    //date field input box
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill("05/10/2027");
    //await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");

    //multiline comment
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page.getByRole("textbox", { name: "Comment" }).fill("This is a multiline comments capturedd by playwright codegen");
    
    //button
    await page.getByRole("button", { name: "Book Appointment" }).click();

    //assertions
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(page.getByRole("link", { name: "Go to Homepage" })).toBeVisible();
  });

  //moretest goes here
});
