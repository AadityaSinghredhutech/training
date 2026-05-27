const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CheckoutPage} = require('./CheckoutPage');
const {placeOrder} = require('./placeOrder');
class POmanager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage= new DashboardPage(this.page);    
        this.placeOrderPage = new placeOrder(this.page);
        this.checkOutPage = new CheckoutPage(this.page);
    }
    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashboardPage;

    }
    getplaceOrder()
    {
        return this.placeOrderPage;
    }
    getcheckOutPage()
    {
        return this.checkOutPage;
    }

}
module.exports={POmanager};