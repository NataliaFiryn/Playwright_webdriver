const { expect } = require('@playwright/test');
class AjaxLoaderPage {
    constructor(page) {
        this.page = page;
        this.clickMeButton = page.locator('#button1[type="button"]')
        this.messegeTitle = page.locator('[class="modal-title"]')
    }
    async goToAjaxLoaderPage() {
        await this.page.goto('/Ajax-Loader/index.html')
        await this.clickMeButton.waitFor()
    }
    async clickOnButtonClickMe() {
        await this.clickMeButton.click()
        expect(await this.messegeTitle).toHaveText('Well Done For Waiting....!!!')
    }
}
module.exports = { AjaxLoaderPage };