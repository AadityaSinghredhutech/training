const {test,expect} = require('@playwright/test');

test('Event hub', async({page})=>
{
    const eventName = "World Tech Summit";
    //login
await page.goto("https://eventhub.rahulshettyacademy.com/login");
await page.locator("#email").fill("hanuchizuru@gmail.com");
await page.locator("#password").fill("Hanusingh89@@");
await page.locator("#login-btn").click();
await page.waitForLoadState('networkidle');
//selecting event
const events = await page.locator("#event-card");
await events.locator("a h3").first().waitFor();
const titles = await events.locator("a h3").allTextContents();
console.log(titles);
const eventCount = await events.count();
for(let i=0;i<eventCount;i++)
{
    if(await events.locator("a h3").nth(i).textContent()===eventName)
    {
        await events.nth(i).locator("#book-now-btn").click();
        break;
    }
}
//booking

await page.locator("#customerName").pressSequentially("Aaditya Singh");
await page.locator("#customer-email").pressSequentially("hanuchizuru@gmail.com");
await page.locator("#phone").pressSequentially("9999999999");
await page.locator("#confirm-booking").click();
await page.locator(".booking-ref").waitFor();

const bookingRef = (await page.locator(".booking-ref").textContent()).trim();
console.log(bookingRef);
await page.locator('button:has-text("View My Bookings")').click();
await page.locator("#booking-card").first().waitFor();
//view details

const bookings = await page.locator("#booking-card");
for(let i=0;i<await bookings.count();i++)
{
    if((await bookings.nth(i).locator(".booking-ref").textContent()).trim()===bookingRef)
    {
        await bookings.nth(i).locator('button:has-text("View Details")').click();
        break;
    }
}
//verification
expect(await page.locator(".font-mono").first().textContent()===bookingRef).toBeTruthy();




await page.pause();



})
