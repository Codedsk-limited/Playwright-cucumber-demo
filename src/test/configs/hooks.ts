import { AfterAll, BeforeAll, Before,After, Status } from "@cucumber/cucumber";
import {Page, Browser, chromium, BrowserContext} from "@playwright/test"
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "./browserSelection/browserManager";
import { getEnv } from "./browserSelection/env/env";

let context : BrowserContext
let browser: Browser

BeforeAll (async function () {
    getEnv()
    browser = await invokeBrowser()
    
})

Before (async function () {
    context = await browser.newContext()
    const page= await context.newPage();
    pageFixture.page = page;
})

After (async function ({pickle, result}) {
    console.log(result?.status)
    if (result?.status == Status.FAILED) {
        //taking screenshot at last
        const img = await pageFixture.page.screenshot({path: './report/screenshots/'+pickle.name+'.png',type:'png'})
        await this.attach(img, 'image/png')
    }
    
    await pageFixture.page.close()
    await context.close()
})

AfterAll (async function () {
    await browser.close()
})