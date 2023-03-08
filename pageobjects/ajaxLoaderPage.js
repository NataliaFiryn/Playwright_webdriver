const { expect } = require('@playwright/test');
class AjaxLoaderPage {
    constructor(page) {
        this.page = page;
        this.ajaxLoaderLink = page.locator('a#ajax-loader')
        this.clickMeButton = page.locator('#button1[type="button"]')
        this.messegeTitle = page.locator('[class="modal-title"]')
    
    }
    async goToAjaxLoaderPage() {
        await this.page.goto('/')
        await this.ajaxLoaderLink.evaluate((el) => el.removeAttribute('target'))
        await this.ajaxLoaderLink.click()
        await this.clickMeButton.waitFor()
    }
    async clickOnButtonClickMe() {
        await this.clickMeButton.click()
        expect(await this.messegeTitle).toHaveText('Well Done For Waiting....!!!')
    }
}
module.exports = { AjaxLoaderPage };