/**
 * Scenario:
 * 1. ✔ Login as standard user
 * 2. ✔ Get a list of products with its price
 * 3. ✔ Assert tht alll products have non-zero dollar value
 *
 */

import{test, expect} from '@playwright/test';
test.describe("Inventory feature", ()=>{
    test.beforeEach("Login with valid credentials", async({page})=> {
        //launch the URL
        await page.goto('https://www.saucedemo.com/');

        //Login
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        //Assertion
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveURL(/.*\/inventory/);

    });

    test ("Should confirm all prices are nonzero values", async({page})=>{
        //Get a list of products 
        let productsElms = page.locator(".inventory_item");
        await expect(productsElms).toHaveCount(6);

        //Get product name and price
        let totalProducts = await productsElms.count();

        let priceArr = []
        for (let i=0; i<totalProducts; i++){
            let eleNode = productsElms.nth(i);

            //product name
            let productName = await eleNode.locator(".inventory_item_name").innerText();

            //price
            let productPrice = await eleNode.locator(".inventory_item_price").innerText();

            //print the results 
            console.log(`Product: ${productName}, Price: ${productPrice}`)

            priceArr.push(productPrice)
        }

        console.log(`Original Price Array ${priceArr}`);

        /**
         * 
         * 1. Replace all $ with ""
         * 2. Compare the priceand it should be > 0
         */
        let priceArray = priceArr.map((item)=> parseFloat(item.replace("$","")));
        console.log(`>> Modified array ${priceArray}`);

        let priceArrWithInvalidVals = priceArray.filter((item)=> item <=0);
        if (priceArrWithInvalidVals.length>0){
            console.log(`Error: Zero price values found, ${priceArrWithInvalidVals}`);
        }
        else{
            console.log(`INFO: All prices are non-zero values`);
        }
        

    });
});
