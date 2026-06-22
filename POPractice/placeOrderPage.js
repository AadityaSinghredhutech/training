const {test,expect} = require('@playwright/test');

class PlaceOrderPage{
    constructor(page)
    {
        this.page=page;
        this.dropdown = page.locator(".ta-results");
        this.emailID=page.locator(".user__name [type='text']").first();
        this.submitButton=page.locator(".action__submit");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async selectCountry(countryName)
    {
        await this.page.getByPlaceholder('Select Country').pressSequentially(countryName, { delay: 150 }) ;
   await this.dropdown.waitFor();
   const optionsCount = await this.dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await this.dropdown.locator("button").nth(i).textContent();
      if (text.trim() === countryName) {
         await this.dropdown.locator("button").nth(i).click();
         break;
      }
   }
    }
    async emailVerification(email)
    {
        await expect(this.emailID).toHaveText(email);
    }
    async submitAndGetOrderID()
    {
        await this.page.locator(".action__submit").click();
   await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   return await this.orderId.textContent();
    }
}
module.exports = {PlaceOrderPage};