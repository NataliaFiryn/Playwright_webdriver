const { test, expect } = require('@playwright/test');
const { PageObjectsManager } = require('../pageobjects/pageObjectsManager')

test.describe('Contact Us', () => {
    test.beforeEach(async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const contactUsPage = pageObjectsManager.getContactUsPage()
        await contactUsPage.goToContactUs()
    });
    test('Happy Path', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const contactUsPage = pageObjectsManager.getContactUsPage()
        await contactUsPage.fillUpContactUsForm('Jane', 'Doe', 'JaneDoe@example.com', 'Comment')
        await contactUsPage.submitContactUsForm()
        await contactUsPage.messageFormSubmitedCorrect()
    });
    test('Reset of entered data', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const contactUsPage = pageObjectsManager.getContactUsPage()
        await contactUsPage.fillUpContactUsForm('Jane', 'Doe', 'JaneDoe@example.com', 'Comment')
        await contactUsPage.resetEnteredData()
    });
    test('Empty Form', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const contactUsPage = pageObjectsManager.getContactUsPage()
        await contactUsPage.submitContactUsForm()
        await contactUsPage.errorMessageAllFieldsRequired()
        await contactUsPage.errorMessageInvalidEmail()
    });
    test('Empty FirstName field', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const contactUsPage = pageObjectsManager.getContactUsPage()
        await contactUsPage.fillUpContactUsForm(null, 'Doe', 'JaneDoe@example.com', 'Comment')
        await contactUsPage.submitContactUsForm()
        await contactUsPage.errorMessageAllFieldsRequired()
    });
    test('Empty LastName field', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const contactUsPage = pageObjectsManager.getContactUsPage()
        await contactUsPage.fillUpContactUsForm('Jane', null, 'JaneDoe@example.com', 'Comment')
        await contactUsPage.submitContactUsForm()
        await contactUsPage.errorMessageAllFieldsRequired()
    });
    test('Empty Email field', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const contactUsPage = pageObjectsManager.getContactUsPage()
        await contactUsPage.fillUpContactUsForm('Jane', 'Doe', null, 'Comment')
        await contactUsPage.submitContactUsForm()
        await contactUsPage.errorMessageAllFieldsRequired()
        await contactUsPage.errorMessageInvalidEmail()
    });
    test('Empty Comment field', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const contactUsPage = pageObjectsManager.getContactUsPage()
        await contactUsPage.fillUpContactUsForm('Jane', 'Doe', 'JaneDoe@example.com', null)
        await contactUsPage.submitContactUsForm()
        await contactUsPage.errorMessageAllFieldsRequired()
    });
    test('Email field validation', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const contactUsPage = pageObjectsManager.getContactUsPage()
        await contactUsPage.emailValidation(['@example.com', 'JaneDoe', 'Jane.Doeexample.com', 'Jane.Doe@', 'Jane..Doeexample.com', 'Jane@Doe@111.222.333.44444'])
    });
});
test.describe('Datapicker', () => {
    test.beforeEach(async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const datapickerPage = pageObjectsManager.getDatapickerPage()
        await datapickerPage.goToDatapicker()
    });
    test('Default Date', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const datapickerPage = pageObjectsManager.getDatapickerPage()
        await datapickerPage.chceckIfDefaultDateIsTodayDate()
    });
    test('Select Date number days from today', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const datapickerPage = pageObjectsManager.getDatapickerPage()
        await datapickerPage.selectDateFromToday(60)
    });
    test('Choose Date', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const datapickerPage = pageObjectsManager.getDatapickerPage()
        await datapickerPage.InsertDate('2033', 'February', '15')
    });
});
test.describe('Autocomplete Text Field', () => {
    test.beforeEach(async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const autocompleteTextFieldPage = pageObjectsManager.getAutocompleteTextFieldPage()
        await autocompleteTextFieldPage.goToAutocompleteTextField()
    });
    test('Choose element from autocomplete list', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const autocompleteTextFieldPage = pageObjectsManager.getAutocompleteTextFieldPage()
        await autocompleteTextFieldPage.typeText('Gra')
        await autocompleteTextFieldPage.chooseElementfromAutocompleteList(1)
        await autocompleteTextFieldPage.submitFoodItem()
    });
});