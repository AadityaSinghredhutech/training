import {Page} from '@playwright/test'
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CheckoutPage} from './CheckoutPage';
import {placeOrder} from './placeOrder';

export class POmanager
{
    page: Page;
    loginPage : LoginPage;
    dashboardPage: DashboardPage;
    placeOrderPage:placeOrder;
    checkOutPage:CheckoutPage;
    constructor(page:Page)
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
