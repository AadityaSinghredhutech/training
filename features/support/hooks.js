const playwright = require('@playwright/test');
const {Before} = require('@cucumber/cucumber');
const {POmanager} = require('../../pageobject/POmanager');

Before(async function(){
    const browser = await playwright.firefox.launch({
        headless:false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    this.page=page;
    this.poManager =new POmanager(page);
})


