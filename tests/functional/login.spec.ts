import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test.beforeEach("Go  to the Login page", async ({ page }) => {
    // go to home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(
      page.locator("//h1[normalize-space()='CURA Healthcare Service']"),
    ).toHaveText("CURA Healthcare Service");

    //click on the make appointment
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
  });

  test("Test should login from valid credentials", async ({ page }) => {
    //login
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("Test should prevent login from invalid credentials", async ({
    page,
  }) => {
    //login unsuccessful
    await page.getByLabel("Username").fill("John smith");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //assert a error text
    await expect(page.locator("#login")).toContainText(
      "Login failed! Please ensure the username and password are valid.",
    );
  });
});
