const {test, expect, request} = require('@playwright/test')
const loginPayLoad ={userEmail:"hanuchizuru@gmail.com", userPassword:"Hanusingh89@"};
const orderPayLoad ={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let orderId;
let token;

test.beforeAll( async ()=>
{
  //Login API
  const apiContext = await request.newContext();
  const logInResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
    data:loginPayLoad
  })
  expect(logInResponse.ok()).toBeTruthy();
  const loginResponseJson = await logInResponse.json();
  token = loginResponseJson.token;
  console.log(token);

  //order API
  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
    data: orderPayLoad,
    headers:{
        'Authorization':token,
        'Content-Type' : 'application/json'
    }

  })
  const orderResponseJson = await orderResponse.json();
  console.log(orderResponseJson);
  orderId = orderResponseJson.orders[0];
}
);

test('Client App login', async ({page})=>
{
  await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);
  },token);

  

const productName='ZARA COAT 3'
const products=page.locator(".card-body");

await page.goto("https://rahulshettyacademy.com/client");


await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").first().waitFor();

const rows = await page.locator("tbody tr");
const rowCount = await rows.count();
for(let i=0; i<rowCount;i++){
  const rowOrderID=await rows.nth(i).locator("th").textContent();
  if(orderId.includes(rowOrderID)){
    await rows.nth(i).locator("button").first().click();
    break;
  }
}
await page.pause();

})