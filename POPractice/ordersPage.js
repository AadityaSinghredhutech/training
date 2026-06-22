const {expect,test} = require('@playwright/test');

class OrderPage{
constructor(page)
{
this.page=page;
this.myOrdersButton=page.locator("button[routerlink*='myorders']");
this.rows = page.locator("tbody tr");
this.orderIdDetails =  page.locator(".col-text");
}

async navigateToMyOrders()
{
    await this.myOrdersButton.click();
   await this.page.locator("tbody").waitFor();
}

async findOrder(orderId)
{
   for (let i = 0; i < await this.rows.count(); ++i) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await this.rows.nth(i).locator("button").first().click();
         break;
      }
   }

}

async orderVerification(orderId)
{
    const orderIdDetails = await this.orderIdDetails.textContent();
    expect(orderId.trim().includes(orderIdDetails.trim())).toBeTruthy();

}

}
module.exports = {OrderPage};