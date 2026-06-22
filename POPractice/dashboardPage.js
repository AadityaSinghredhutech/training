class DashboardPage{
    constructor(page)
    {
        this.products = page.locator(".card-body");
        this.productTitles =page.locator(".card-body b");
        this.cartPage= page.locator("[routerlink*='cart']");
        this.page = page;

    }

    async searchProduct(productName)
    {
        await this.productTitles.first().waitFor();
   const titles = await this.productTitles.allTextContents();
   console.log(titles); 
   const count = await this.products.count();
   for (let i = 0; i < count; ++i) {
      if (await this.products.nth(i).locator("b").textContent() === productName) {
         
         await this.products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
    }
    async navigateToCart()
    {
        await this.cartPage.click();
        await this.page.locator("div li").first().waitFor();

    }
}
module.exports = {DashboardPage};