const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

let browser;
let page;

setDefaultTimeout(60000);

Before(async function()
{
    browser = await chromium.launch({headless : false});
    page = await browser.newPage();
})

After(async function(){
    await browser.close();
})

//Scenario 1 Hover

Given('I navigate to the hover page', async function () {
          await page.goto("https://practice.expandtesting.com/hovers");
         });

When('I hover over user {int}', async function (userNumber) {
    this.userNumber=userNumber;
         await page.locator('[alt="User Avatar"]').nth(userNumber-1).hover();
         }); 
         
Then('the profile link should become visible', async function () {
           await expect(page.locator(`[href*="/users/${this.userNumber}"]`)).toBeVisible()
         });         

// Scenario 2 Context-Menu

Given('I navigate to the context menu page',async function () {
           await page.goto("https://practice.expandtesting.com/context-menu");
         });
        
When('I right click on the box', async function () {
    //it listens the dialog 

         page.on('dialog', async dialog=>
         {
            expect(dialog.message()).toContain('You selected a context menu');
            await dialog.accept();
         }
         )
          await page.locator('div#hot-spot').click({button:'right'});
         }); 
        
Then('I should see the context menu alert', async function () {
           
         });    
         
//Scenario 3: Dropdown 

Given('I navigate to the dropdown page', async function () {
          await page.goto('https://practice.expandtesting.com/dropdown');
         }); 

When('I select option from dropdown',async function () {
           await page.locator('#dropdown').selectOption("2");
         }); 
         
Then('option should be selected',async function () {
           const value=await page.locator('#dropdown').inputValue();
           expect(value).toBe("2");

         });   
         
//Scenario 4: Autocomplete

Given('I navigate to the autocomplete page',async function () {
           await page.goto('https://practice.expandtesting.com/autocomplete');
         }); 

When('I type country name', async function () {
           await page.locator('#country').pressSequentially('India',{delay:150})
         }); 
         
When('I select India from suggestion', async function () {
           await page.locator('#countryautocomplete-list div').getByText('India').click();
         }); 
        
Then('India should be selected', async function () {
           await expect(await page.locator('#country').inputValue()).toBe('India');
           
         });         
        
         