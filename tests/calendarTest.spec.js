const {test, expect} = require('@playwright/test');

test('Calendar Test', async({page})=> {
const monthNumber = "6";
const day= "14";
const year = "2027";
const expectedList = [monthNumber,day,year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
await page.locator(".react-calendar__month-view__days__day", {hasText : day}).click();

const input = page.locator(".react-date-picker__inputGroup__input");

for(let i=0; i<expectedList.length;i++){
    const value = await input.nth(i).inputValue();
    expect(value).toEqual(expectedList[i]);
}
})