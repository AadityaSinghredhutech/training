class placeOrder {
    constructor(page){
        this.page=page;
        this.countrySection = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
    
    }

    async dropdownSelect(countryName){
        await this.countrySection.pressSequentially(countryName,{delay:150});
        await this.dropdown.waitFor();
        const optionCount=await this.dropdown.locator("button").count();
        for(let i=0;i<optionCount;i++){
         const text=await this.dropdown.locator("button").nth(i).textContent();
          if(text.trim()===countryName){
          await this.dropdown.locator("button").nth(i).click();
           break;
}
}
    }





}
module.exports={placeOrder};