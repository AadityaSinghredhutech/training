
import {expect,test,Locator, Page} from '@playwright/test'

export class CheckoutPage {
    page:Page;
    checkout:Locator;

    constructor(page:Page) {

        this.page = page;

        this.checkout = page.locator("button:has-text('Checkout')");
    }

    async productVerification(productName:String) {

        const product = this.getProductLocator(productName);

        await product.waitFor();

        await expect(product).toBeVisible();
    }

    async checkoutClick() {

        await this.checkout.click();
    }

    getProductLocator(productName:String) {

        return this.page.locator(`h3:has-text("${productName}")`);
    }
}
