const {expect, test, request} = require('@playwrigh/test')
const payload = {userEmail: "hanuchizuru@gmail.com", userPassword: "Hanusingh89@"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
beforeAll( async ()=>
{
    const APIcontext = await request.newContext();
    const apiResponse = await APIcontext.post("https://rahulshettyacademy.com/client/#/auth/login",
        {
            data: payload
        }
    )
    const loginResponseJson = apiResponse.json();
    const token = await loginResponseJson.token;

    const orderResponse = await APIcontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data: orderPayload,
        headers:{
            'Authorization':token,
            'Content-Type': 'application/json'
        }
    })
    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
})

test( async ()=>
{
await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);}, token
);

})