const { expect } = require('@playwright/test');
class DatapickerPage {
    constructor(page) {
        this.page = page;
        //this.firstNameField = page.locator('[name="first_name"]')
        

    }
    async goToDatapicker() {
        await this.page.goto('/Datepicker/index.html')
    }
};
module.exports = { DatapickerPage };