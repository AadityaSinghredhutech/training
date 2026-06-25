const {test,expect} = require('@playwright/test');

test('Employee Add',async ({page})=>{
    const username="Admin";
    const password="admin123";
    const firstName ="Aaditya";
    const lastName ="Singh";


    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator('[name="username"]').fill(username);
    await page.locator('[name="password"]').fill(password);
    await page.locator('[type="submit"]').click();

    await page.locator('span.oxd-main-menu-item--name').filter({hasText:"PIM"}).click();
    await page.locator('a.oxd-topbar-body-nav-tab-item').filter({hasText:"Add Employee"}).click();
    await page.locator('[name="firstName"]').fill(firstName);
    await page.locator('[name="lastName"]').fill(lastName);
    
    const employeeIdBox=await page.locator('.oxd-input--active').nth(3);
    await employeeIdBox.click();

    const value=await employeeIdBox.inputValue();
    for(let i=0;i<await value.length;i++)
    {
        await employeeIdBox.press('Backspace');
    }

    await employeeIdBox.fill("11111");
    await page.locator('[type="submit"]').click();
    await expect(page.locator('.oxd-toast')).toBeVisible();
    await page.locator('.oxd-topbar-body-nav-tab-item').filter({hasText:"Employee List"}).click();

    //await page.getByPlaceholder('Type for hints...').fill(`${firstName} ${lastName}`);
    await page.locator('.oxd-autocomplete-text-input input').nth(0).fill(`${firstName} ${lastName}`);
    await console.log(await page.locator('.oxd-autocomplete-dropdown').count());

   // await page.locator('.oxd-autocomplete-dropdown').nth(1).click();
    await page.locator('input.oxd-input').nth(1).fill("11111");
    await page.locator('[type="submit"]').click();


})