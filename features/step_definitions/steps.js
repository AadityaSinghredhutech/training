const {When, Then, Given,setDefaultTimeout} = require('@cucumber/cucumber')
const {POmanager}= require('../../pageobject/POmanager');
const {test,expect,playwright}= require('@playwright/test');
const { chromium, firefox, webkit} = require('@playwright/test');
setDefaultTimeout(60 * 1000);
Given('a login to Ecommerce application with {string} and {string}', async function (string, string2) {
           const browser = await firefox.launch();
           const context = await browser.newContext();
           const page = await context.newPage();
           this.poManager = new POmanager(page);
           const products=page.locator(".card-body");
           const loginPage = this.poManager.getLoginPage();
           await loginPage.goTo();
           await loginPage.validLogin(string,string2); 
         });

When('Add {string} to Cart', async function (string) {
           const dashboardPage = this.poManager.getDashboardPage();
           await dashboardPage.searchProductAddCart(string);
           await dashboardPage.navigateToCart();
         });

 Then('Check if {string} is in cart or not', async function (string) {
           const checkout = this.poManager.getcheckOutPage();
          await checkout.productVerification(string);
          await checkout.checkoutClick();
         });         
         
When('User completes payment and submits order', async function () {
           const PlaceOrder = this.poManager.getplaceOrder();
           await PlaceOrder.dropdownSelect("India");
         });