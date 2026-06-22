const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../POPractice/loginPage');
const {DashboardPage}= require('../POPractice/dashboardPage');
const {CartPage}=require('../POPractice/cartPage');
const {PlaceOrderPage} = require('../POPractice/placeOrderPage');
const {OrderPage} = require('../POPractice/ordersPage');
 
test('@Webst Client App login', async ({ page }) => {
   
   const email = "hanuchizuru@gmail.com";
   const password = "Hanusingh89@@@@";
   const productName = 'ZARA COAT 3';;
   const countryName ="India";
   
   const loginPage =  new LoginPage(page);
   await loginPage.goTo();
   await loginPage.validLogin(email,password);

   const dashboardPage = new DashboardPage(page);
   await dashboardPage.searchProduct(productName);
   await dashboardPage.navigateToCart();

   const cartPage = new CartPage(page);
   await cartPage.productVerification(productName);
   await cartPage.checkout();

   const placeOrderPage = new PlaceOrderPage(page);
   await placeOrderPage.selectCountry(countryName);
 
   await placeOrderPage.emailVerification(email);
   const orderId=await placeOrderPage.submitAndGetOrderID();
   console.log(orderId);

   const orderPage = new OrderPage(page);
   await orderPage.navigateToMyOrders();
   await orderPage.findOrder(orderId);
   await orderPage.orderVerification(orderId);
});