const {test,expect} = require('@playwright/test')

test('Practice test', async ({page})=>
{
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const email = "hanuchizuru@gmail.com";
    const password = "Hanusingh89@";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const prodCount = await products.count();
    for(let i=0; i<prodCount;i++){
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text =Add To Cart").click();
            break;

        }

    }
    await page.pause();

    



})
