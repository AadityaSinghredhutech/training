const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

let browser;
let page;
let context;


Given('user is on SauceDemo login page', async function(){
    await this.page.goto("https://www.saucedemo.com/");
})

When('user enters {string} and {string}', async function(username,password){
    await this.page.locator('#user-name').fill(username);
    await this.page.locator('#password').fill(password);
});

When('user clicks on login button',async function(){
    await this.page.locator('#login-button').click();
});
