const {test,expect} = require('@playwright/test')

test('GetBy Rewrite', async ({page})=>
{
   
const email="hanuchizuru@gmail.com";
const password ="Hanusingh89@";
const productName='ZARA COAT 3'
const products=page.locator(".card-body");

await page.goto("https://rahulshettyacademy.com/client");

await page.getByPlaceholder("email@example.com").fill(email);
await page.getByPlaceholder("enter your passsword").fill(password);
await page.getByRole('button',{name:"Login"}).click();

await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();

const titles=await page.locator(".card-body b").allTextContents();
console.log(titles);

await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole('Button',{name:"Add to Cart"}),click();

await page.getByRole("listitem").getByRole("button", {name:"Cart"}).click();

await page.locator("div li").first().waitFor();

await expect(page.getByText("ZARA COAT 3")).toBeVisible();

await page.getByRole("button", {name:"Checkout"}).click();

await page.getByPlaceholder("Select Country")
.pressSequentially("ind",{delay:150});

await page.getByRole("button",{name:"India"}),nth(1).click();

await expect(page.locator(".user__name [type='text']").first())
.toHaveText("hanuchizuru@gmail.com");

await page.getByText("PLACE ORDER").click();

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