test('Network Falsify', async ()=>
{
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>{
            const response = page.request.fetch(route.request());
            let body = fakePayLoad;
            route.fulfill({
                response,
                body,
            })
        }
    )

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a19668217ee3e78baa72cbf",
        route=>{
            const response = page.request.fetch(route.request());
            let body = payload;
            route.fulfi;;({
                response,
                body,
            })
        }
    )
})