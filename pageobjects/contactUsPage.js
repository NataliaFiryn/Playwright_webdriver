const { test, expect } = require('@playwright/test');
class ContactUsPage {
    constructor(page){
        this.page = page;
        this.example = page.locator(' ');
    
    }
    async goToContactUs(){
        await this.page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html')
    }

}
module.exports = {ContactUsPage};