const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { POmanager } = require('../../pageobject/POmanager');
const { firefox } = require('@playwright/test'); 

setDefaultTimeout(60 * 1000); 

Given('Dashboard will open', async function () {
            this.dashboardPage = this.poManager.getDashboardPage();
         });

 When('User will find the product named {string} and User will add the product to cart',async function (string) {
           await this.dashboardPage.searchProductAddCart(string);
         }); 
 Then('cart page is opened',async function () {
           await this.dashboardPage.navigateToCart()
         });                