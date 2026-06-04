const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { POmanager } = require('../../pageobject/POmanager');
const { firefox } = require('@playwright/test'); 

setDefaultTimeout(60 * 1000); 

 Given('The product named {string} will be added to cart', async function (string) {
           this.dashboardPage = this.poManager.getDashboardPage();      
           await this.dashboardPage.searchProductAddCart(string);
         });

 When('The user will open the cart page and click on checkout',async function () {
           await this.dashboardPage.navigateToCart();
           const checkout = this.poManager.getcheckOutPage();
           await checkout.checkoutClick(); 

         }); 
 Then('The user will select the country and place the order',async  function () {
           const placeOrder = this.poManager.getplaceOrder();
           await placeOrder.dropdownSelect('India');
           await this.page.locator(".action__submit").click();
         });                 