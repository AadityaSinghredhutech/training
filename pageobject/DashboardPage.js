class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductAddCart(productName) {

        console.log("Waiting for products...");

        await this.productsText.first().waitFor();

        const titles = await this.productsText.allTextContents();
        console.log("Products found:", titles);

        const count = await this.products.count();

        for (let i = 0; i < count; i++) {

            const title = await this.products
                .nth(i)
                .locator("b")
                .textContent();

            console.log("Checking:", title);

            if (title.trim() === productName) {

                console.log("Found product. Clicking Add To Cart");

                await this.products
                    .nth(i)
                    .locator("text=Add To Cart")
                    .click();

                console.log("Add To Cart clicked");

                break;
            }
        }

        console.log("Finished searchProductAddCart()");
    }

    async navigateToCart() {

        console.log("About to click cart");

        await this.cart.click();

        console.log("Cart clicked");

        await this.page.locator("div li").first().waitFor();

        console.log("Cart page loaded");
    }
}

module.exports = { DashboardPage };