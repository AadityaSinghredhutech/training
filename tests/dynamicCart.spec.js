const {test, expect, request} = require('@playwright/test')
const loginPayLoad ={userEmail:"hanuchizuru@gmail.com", userPassword:"Hanusingh89@"};
let token;

test.beforeAll( async ()=>
{
  const apiContext = await request.newContext();
  const logInResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
    data:loginPayLoad
  })
  expect(logInResponse.ok()).toBeTruthy();
  const loginResponseJson = await logInResponse.json();
  token = loginResponseJson.token;
  console.log(token);
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

//await page.locator("#userEmail").fill("hanuchizuru@gmail.com");
//await page.locator("#userPassword").fill("Hanusingh89@");
//await page.locator("#login").click();

await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();

const titles=await page.locator(".card-body b").allTextContents();
console.log(titles);

const count=await products.count();

for(let i=0;i<count;i++){

if(await products.nth(i).locator("b").textContent()===productName){

await products.nth(i).locator("text=Add To Cart").click();
break;

}
}

await page.locator("[routerlink*='cart']").click();

await page.locator("div li").first().waitFor();

const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();

expect(bool).toBeTruthy();

await page.locator("button:has-text('Checkout')").click();

await page.locator("[placeholder*='Country']")
.pressSequentially("ind",{delay:150});

const dropdown=page.locator(".ta-results");

await dropdown.waitFor();

const optionCount=await dropdown.locator("button").count();

for(let i=0;i<optionCount;i++){

const text=await dropdown.locator("button").nth(i).textContent();

if(text.trim()==="India"){

await dropdown.locator("button").nth(i).click();
break;

}
}

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