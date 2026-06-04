const { Given, When, Then, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { POmanager } = require('../../pageobject/POmanager');
const { firefox } = require('@playwright/test');

setDefaultTimeout(60 * 1000);

Given(
  'a login to Ecommerce application with {string} and {string}',
  async function (email, password) {
    const loginPage = this.poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(email, password);
  }
);

When('Add {string} to Cart', async function (productName) {

  const dashboardPage = this.poManager.getDashboardPage();

  await dashboardPage.searchProductAddCart(productName);

  await dashboardPage.navigateToCart();
});

Then('Check if {string} is in cart or not', async function (productName) {

  const checkout = this.poManager.getcheckOutPage();

  await checkout.productVerification(productName);

  await checkout.checkoutClick();
});

When('User completes payment and submits order', async function () {

  const placeOrder = this.poManager.getplaceOrder();

  await placeOrder.dropdownSelect('India');
});

After(async function () {

  if (this.browser) {
    await this.browser.close();
  }
});