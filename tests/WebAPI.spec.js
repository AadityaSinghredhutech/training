const {test, expect, request} = require('@playwright/test')
const {APiUtils} = require('./utils/APiUtils')
const loginPayLoad ={userEmail:"hanuchizuru@gmail.com", userPassword:"Hanusingh89@"};
const orderPayLoad ={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll( async ()=>
{
  
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
}
);

test('Client App login', async ({page})=>
{
  await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);
  },response.token);

await page.goto("https://rahulshettyacademy.com/client");


await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").first().waitFor();

const rows = await page.locator("tbody tr");
const rowCount = await rows.count();
for(let i=0; i<rowCount;i++){
  const rowOrderID=await rows.nth(i).locator("th").textContent();
  if(response.orderId.includes(rowOrderID)){
    await rows.nth(i).locator("button").first().click();
    break;
  }
}
await page.pause();

})