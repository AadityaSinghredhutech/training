const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { POmanager } = require('../../pageobject/POmanager');
const { firefox } = require('@playwright/test'); 

setDefaultTimeout(60 * 1000);

Given('user is on login page',async function () {
            this.loginPage = this.poManager.getLoginPage(); 
            await this.loginPage.goTo();
         });

When('user logs in with valid credentials {string} and {string}',async function (string, string2) {
           await this.loginPage.validLogin(string, string2);
         });      
         
 Then('dashboard should be displayed',async function () {
           const dashboardPage = this.poManager.getDashboardPage();
         }); 

Given('the user is logged in', async function () {

    this.loginPage = this.poManager.getLoginPage();

    await this.loginPage.goTo();

    await this.loginPage.validLogin(
        'hanuchizuru@gmail.com',
        'Hanusingh89@@@@'
    );
});         