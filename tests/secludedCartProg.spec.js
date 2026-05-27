const {test, expect, request} = require('@playwright/test')
const {POmanager}= require('../pageobject/POmanager');
const {CheckoutPage} = require ('../pageobject/CheckoutPage');
const {placeOrder}=require('../pageobject/placeOrder');


test('Client App login', async ({page})=>
{
  const poManager = new POmanager(page);
    const email ="hanuchizuru@gmail.com";
    const password ="Hanusingh89@";
const productName='ZARA COAT 3';
const products=page.locator(".card-body");
const loginPage = poManager.getLoginPage();
await loginPage.goTo();
await loginPage.validLogin(email,password); 
const dashboardPage = poManager.getDashboardPage();
await dashboardPage.searchProductAddCart(productName);
await dashboardPage.navigateToCart();
const checkout = poManager.getcheckOutPage();
await checkout.productVerification(productName);
await checkout.checkoutClick();
const PlaceOrder = poManager.getplaceOrder();
await PlaceOrder.dropdownSelect("India");

await expect(page.locator(".user__name [type='text']").first())
.toHaveText("hanuchizuru@gmail.com");
await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary"))
.toHaveText(" Thankyou for the order. ");
const orderID=await page.locator(".em-spacer-1 .ng-star-inserted")
.textContent();
console.log(orderID);
await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").first().waitFor();
const rows = await page.locator("tbody tr");
const rowCount = await rows.count();
for(let i=0; i<rowCount;i++){
  const rowOrderID=await rows.nth(i).locator("th").textContent();
  if(orderID.includes(rowOrderID)){
    await rows.nth(i).locator("button").first().click();
    break;
  }
}
await page.pause();
})
