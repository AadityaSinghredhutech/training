const {expect} = require('@playwright/test');

class CartPage{
    constructor(page)
    {
        this.page = page;
    }

    async productVerification(productName)
    {
        const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible();
           expect(bool).toBeTruthy();
    }

    async checkout()
    {
        await this.page.locator("text=Checkout").click();
    }

}
module.exports={CartPage};