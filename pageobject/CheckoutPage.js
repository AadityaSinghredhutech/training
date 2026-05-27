const {expect} = require('@playwright/test');

class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.productText = page.locator(".card-body b");
        this.cartProducts = page.locator("div li").first();
        this.checkout = page.locator("button:has-text('Checkout')");
    }

    async productVerification(productName) {
        await this.cartProducts.waitFor();

        const bool = await this.getProductLocator(productName).isVisible();

        expect(bool).toBeTruthy();
    }

    async checkoutClick() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }
}

module.exports = {CheckoutPage};