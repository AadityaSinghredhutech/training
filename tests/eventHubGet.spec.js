const {test,expect} = require('@playwright/test');

test('Event hub', async({page})=>
{
    const eventName = "World Tech Summit";
    //login
await page.goto("https://eventhub.rahulshettyacademy.com/login");
await page.getByPlaceholder("you@email.com").fill("hanuchizuru@gmail.com");
await page.getByPlaceholder("••••••").fill("Hanusingh89@@");
await page.getByRole('button',{name:"Sign In"}).click();
await page.waitForLoadState('networkidle');
//selecting event
const events = await page.locator("#event-card");
await events.locator("a h3").first().waitFor();
const titles = await events.locator("a h3").allTextContents();
console.log(titles);
await events.filter({hasText:'World Tech Summit'}).getByRole('link',{name:"Book Now"}).click();

//booking

await page.getByPlaceholder("Your full name").pressSequentially("Aaditya Singh");
await page.getByPlaceholder("you@email.com").pressSequentially("hanuchizuru@gmail.com");
await page.getByPlaceholder("+91 98765 43210").pressSequentially("9999999999");
await page.getByRole("button",{name:"Confirm Booking"}).click();
await page.locator(".booking-ref").waitFor();

const bookingRef = (await page.locator(".booking-ref").textContent()).trim();
console.log(bookingRef);
await page.locator('button:has-text("View My Bookings")').click();
await page.locator("#booking-card").first().waitFor();
//view details

const bookings = await page.locator("#booking-card");
await bookings.filter({hasText:bookingRef}).getByRole("button",{name:"View Details"}).click();

//verification
expect(await page.locator(".font-mono").first().textContent()===bookingRef).toBeTruthy();




await page.pause();



})
