const { test, expect,request } = require('@playwright/test');
const loginpayLoad = {userEmail: "hanuchizuru@gmail.com", userPassword: "Hanusingh89@"};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;

test.beforeAll( async ()=>
{
    //loginAPI
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginpayLoad
        }
    )
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token =loginResponseJson.token; 
    console.log(token);

    //orderIdAPI
    const placeOrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:orderPayLoad,
        headers:{
            'Authorization' : token,
            'Content-Type' : 'application/json'
        }
    });
    expect(placeOrderResponse.ok()).toBeTruthy;
    const orderResponseJson = await placeOrderResponse.json();  
    console.log(orderResponseJson);
    orderId =  orderResponseJson.orders[0];
}
)
  
test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);
   },token);
   const email = "hanuchizuru@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});