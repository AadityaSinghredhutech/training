const {test,expect} = require('@playwright/test');

test("Pagination Handle", async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const table = await page.locator('#productTable');

    const column = await table.locator('thead tr th');
    console.log("Number of columns", await column.count());

    const row = await table.locator('tbody tr');
    console.log("Number of rows",await row.count());

    const pagination = page.locator(".pagination li a");

    for(let p=0;p<await pagination.count();p++){
        if(p>0)
        {
            await pagination.nth(p).click();
        }
        for(let i=0;i<await row.count();i++)
    {
        const rows = row.nth(i);
        const tds = rows.locator('td');
        for(let j=0;j<await tds.count()-1;j++)
        {
            console.log(await tds.nth(j).textContent());
        }
    }
    }

    

});