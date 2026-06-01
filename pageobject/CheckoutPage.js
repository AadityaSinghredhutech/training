const {expect} = require('@playwright/test');

class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.checkout = page.locator("button:has-text('Checkout')");
    }

    async productVerification(productName) {

        const product = this.getProductLocator(productName);

        await product.waitFor();

        await expect(product).toBeVisible();
    }

    async checkoutClick() {

        await this.checkout.click();
    }

    getProductLocator(productName) {

        return this.page.locator(`h3:has-text("${productName}")`);
    }
}

module.exports = {CheckoutPage};