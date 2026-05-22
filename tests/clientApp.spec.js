const {test, expect} = require('@playwright/test');

test.only('Browser Context- Validating error login', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("hanuchizuru@gmail.com")
    await page.locator("#userPassword").fill("Hanusingh89@")
    await page.locator("[value='Login']").click();
    await page.locator(".card-body b").first().waitFor();
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title);



    
})