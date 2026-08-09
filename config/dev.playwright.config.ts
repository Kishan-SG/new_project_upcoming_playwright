import { defineConfig, devices } from "@playwright/test";
import {baseConfig} from "../playwright.config.ts";
import {EnvConfig } from "../tests/helpers/config-fixtures.ts";
import path from "node:path";

console.log(`---RUNNING TESTS  IN DEV ENV---`);

export default defineConfig({
    ...baseConfig,          //Loads all the existing config values............ https://katalon-demo-cura.herokuapp.com/

    testDir: path.resolve(process.cwd(), "./tests"),
    use: {
        ...baseConfig.use, // Loading the  existing use object
        envName: "dev",
        appURL: "www.google.com",
        dbConfig:{
            server: "",
            dbname: "",
            connecttionStr: ""
        },
    },

});
