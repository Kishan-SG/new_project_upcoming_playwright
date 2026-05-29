import { test, expect, } from "@playwright/test";
test("Test should lod home page correct title", async ({ page }) => {
  // go to home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  //Assert if the  title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  //Assert header text
  await expect(page.locator("//h1[normalize-space()='CURA Healthcare Service']")).toHaveText("CURA Healthcare Service");
});

test.only("should do somthing", async({page}) => {
    // ✔ do something 
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  //2. Click on the make appointment
  let makeAppmBtn = page.getByRole('link', { name: 'Make Appointment' });
  console.log(`the type of locstor : ${typeof makeAppmBtn}, the vaalue of the locator is: ${JSON.stringify(makeAppmBtn)}`)
  await makeAppmBtn.click();
  await expect(page.getByText('Please login to make')).toBeVisible();
});
