const {test,expect, request} = require('@playwright/test');
let loginFakePayLoad = {email: "hanuchizuru@gmail.com", password: "Hanusingh89@@"};
let orderFakePayLoad = {customerName: "aaditya", customerEmail: "hanuchizuru@gmail.com", customerPhone: "9999999999",eventId:1,quantity: 1};
let orderId;
let token;

test.beforeAll(async ()=>{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",{
        data:loginFakePayLoad,
        headers:{
            'Content-Type' : 'application/json'
        }
    });
    expect (loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    //booking
    const orderResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",{
        data:orderFakePayLoad,
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' :  `Bearer ${token}`
        }
    })
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.data.id;
    console.log(orderId);
});

test('Event hub', async({page})=>
{
    const eventName = "World Tech Summit";
    await page.addInitScript(value=>{
    window.localStorage.setItem('eventhub_token',value);
},token);

    //login
await page.goto("https://eventhub.rahulshettyacademy.com/");

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

//verification
expect(await page.locator(".font-mono").first().textContent()===bookingRef).toBeTruthy();
await page.pause();
})

