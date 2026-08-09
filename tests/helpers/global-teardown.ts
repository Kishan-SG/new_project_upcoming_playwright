import {type FullConfig} from '@playwright/test';
import {exec} from "child_process";
import path from 'path';
//import fs from "fs";
import { error } from 'console';
import { stderr, stdout } from 'process';

export default async function globalTeardown(config: FullConfig) {
    console.log(`[INFO]: Starting the global teardown process...`);

    //Generate allure report for local runs
    if (process.env.RUNNER?.toUpperCase()=== 'LOCAL'){
        console.log(`>> Local runn detected - starting allure server...`);
            exec("allure serve", (error, stdout, stderr)=>{
                if(error){
                console.error(`ERROR: Starting Allure server:`,error.message );
            }
        });
       
    }

console.log(`[INFO]: Completed the global setup...`);
}