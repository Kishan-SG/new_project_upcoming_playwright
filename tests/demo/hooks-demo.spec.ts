import {test,expect} from "@playwright/test"

test.beforeAll("Before all hook", ()=> {
    console.log(`>>beforeAll: file scope...`) //should run just once per worker
});

test.beforeEach("BeforeEach", ()=> {
    console.log(">>before Each: file scope..."); //should run before all the tests in this file 
});

test.describe("Test suite 1", ()=> {
    //before all
    test.beforeAll("Beforeall hoook", ()=> {
        console.log(`>> suite1: before all describe scope...`);
    });

//beforeEach
test.beforeEach("BeforeEach",()=> {
    console.log(`>> Suite 1: beforeEach at describe level...`);
});

// test.describe("Test suite 1", ()=>{
//     console.log("running test one...");
//     await page.goto("")

//});
});