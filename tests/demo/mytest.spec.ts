import { test, expect, devices} from "@playwright/test";
import constants from "../../data/constants.json";
test("Test should lod home page correct title", async ({ page }) => {
  // go to home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  //Assert if the  title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  //Assert header text
  await expect(page.locator("//h1[normalize-space()='CURA Healthcare Service']")).toHaveText("CURA Healthcare Service");
});

test("should do somthing", async({page}) => {
    // ✔ do something 
  await page.goto('https://katalon-demo-cura.herokuapp.com/');

  //2. Click on the make appointment 
  let makeAppmBtn = page.getByRole('link', { name: 'Make Appointment' });
  console.log(`the type of locstor : ${typeof makeAppmBtn}, the vaalue of the locator is: ${JSON.stringify(makeAppmBtn)}`)
  await makeAppmBtn.click();
  await expect(page.getByText('Please login to make')).toBeVisible();
});


test("should do execute somthing", async({page}, testInfo) => {
  console.log(`>> Config at run-time: ${testInfo.config}`)

});

test("should do demo somthing page fixtures", async({page, browserName}, testInfo) => { //it tells the browsername which it is running on
  console.log(`>> test runs on: ${browserName}`)

});

test.only("should demo devices", async({page}, testInfo) => { //it tells the browsername which it is running on
  console.log(`>> test runs on: ${Object.keys(devices)}`);

});

test.only("should demo goole run 1",{tag:'@demo'}, async({page}, testInfo) => { //it tells the browsername which it is running on
  await page.goto("https://www.google.com");

});

test("should demo goole run 2",{tag:'@demo'}, async({page}, testInfo) => { //it tells the browsername which it is running on
  await page.goto("https://www.google.com");

});

test.only("should demo constant data ", async({page}, testInfo) => { //it tells the browsername which it is running on
  console.log(`>>Constants data: ${JSON.stringify(constants.STATUSCODES)}`);

});

