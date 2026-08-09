import {type FullConfig} from '@playwright/test';
//import {exec} from "child_process";
import path from 'path';
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
    console.log(`[INFO]: Starting the global setup...`);
    if (process.env.RUNNER?.toUpperCase()=== 'LOCAL'){

        console.log(`[INFO]: Detecting local run..`);
        //Deleteallure results
        const resultsDir = path.resolve(process.cwd(),"allure-results");
        console.log(`>> resultsDir: ${resultsDir}`);
        if(fs.existsSync(resultsDir)){
        fs.rmSync(resultsDir, {recursive: true, force: true});
        console.log(`[INFO]: Allure results deleted for local run`);
        }
    }

console.log(`[INFO]: Completed the global setup...`);

//Set thelogin cokie global variable
process.env.LOGIN_COOKIES = undefined

}