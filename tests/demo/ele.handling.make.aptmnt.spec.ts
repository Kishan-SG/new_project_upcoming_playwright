import { test, expect } from "@playwright/test";

test.describe("Make appointment", () => {
  test.beforeEach("Login with valid cred", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    //2. 🐱‍🏍Click on the make appointment
    //await page.getByRole("link", { name: "Make Appointment" }).click(); //click method
    //await page.getByRole("link", { name: "Make Appointment" }).press("Enter"); //press method
    //await page.getByRole("link", { name: "Make Appointment" }).dblclick(); //dblclick method
    //await page.getByRole("link", { name: "Make Appointment" }).click({button: "right"}); //right click method
    //await page.getByRole("link", { name: "Make Appointment" }).hover();
    await page.getByRole("link", { name: "Make Appointment" }).click({timeout: 10_000}); //timeouts 


    await expect(page.getByText("Please login to make")).toBeVisible();

    //🐱‍🏍successfull login
    //await page.getByLabel("Username").fill("John Doe");
    // await page.getByLabel("Username").clear(); //clears and enter
    // await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Username").pressSequentially("John Doe", {delay:200});// .presssequentially()-method

    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    //assert a text
    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  //test goes here
  test("test should make an appointment with non-default values", async ({ page }) => {


    //dropdown😊
    await expect(page.getByLabel("Facility")).toHaveValue('Tokyo CURA Healthcare Center');
    await page.getByLabel("Facility").selectOption("Hongkong CURA Healthcare Center");
    await page.getByLabel("Facility").selectOption({label:'Seoul CURA Healthcare Center'}); //which selects by label 
    await page.getByLabel("Facility").selectOption({index: 0}); //which selects by index


    //Assert by count 
    let drpDwn = page.getByLabel("Facility").locator('option');
    await expect(drpDwn).toHaveCount(3);

    //Get all dropdown values
    let listOfDrpDown = await page.getByLabel("Facility").all();

    //for ...of  loop
    let listOfOptions = [];
    for(let ele of listOfDrpDown){
      let eletext = await ele.textContent();
      if(eletext) {
        listOfOptions.push(eletext)
      }
      
    }
    console.log(`>>list of options ${listOfOptions}`)


    //chechkbox
    await page.getByText("Apply for hospital readmission").click(); //.check(), .uncheck()

    //radiobutton
    //ssert the default option - to be checked /unchecked
    await expect(page.getByText("Medicare")).toBeChecked();
    await page.getByText("Medicaid").click();
    await expect(page.getByText("Medicare")).not.toBeChecked();

    //date field input box
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill("05/10/2027");
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");

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
