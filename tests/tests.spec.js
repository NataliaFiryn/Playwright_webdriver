const { test, expect } = require('@playwright/test');
const { PageObjectsManager } = require('../pageobjects/pageObjectsManager')

test.describe('Contact Us', () => { 
    test('Example', async ({page}) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const contactUsPage = pageObjectsManager.getContactUsPage()
        await contactUsPage.goToContactUs()

    });
});