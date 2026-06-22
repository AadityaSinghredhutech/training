const {test,expect} = require('@playwright/test');

test('Date Picker Testing', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    const year="2026";
    const month="July";
    const day="27";

    await page.locator('#datepicker').click();

    while(true)
    {
        const currentMonth=await page.locator('.ui-datepicker-month').textContent();
        const currentYear=await page.locator('.ui-datepicker-year').textContent();

        if(currentMonth==month && currentYear==year)
        {
            break;
        }
        //next
        await page.locator('.ui-icon-circle-triangle-e').click();
        
        const dates = await page.locator('a.ui-state-default');

        for(let i=0;i<await dates.count();i++)
        {
            if(await dates.nth(i).textContent()===day)
            {
                await dates.nth(i).click();
                break;
            }
        }


    }
})