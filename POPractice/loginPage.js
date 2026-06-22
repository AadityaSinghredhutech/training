
class LoginPage{
constructor(page){
    this.userEmail = page.locator("#userEmail");
    this.userPassword = page.locator("#userPassword");
    this.signInButton = page.locator("[value='Login']");
    this.page=page;
};

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(username,password)
{
    await this.userEmail.fill(username);
    await this.userPassword.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
}


}
module.exports={LoginPage};