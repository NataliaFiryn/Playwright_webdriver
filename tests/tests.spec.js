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
test.describe('Dropdown Menu(s), Checkboxe(s) & Radio Button(s)', () => {
    test.beforeEach(async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const dropdownsCheckboxesRadioButtonsPage = pageObjectsManager.getDropdownsCheckboxesRadioButtonsPage()
        await dropdownsCheckboxesRadioButtonsPage.goToDropdownsCheckboxesRadioButtonsPage()
    });
    //Dropdown Menu(s)
    test('First dropdown', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const dropdownsCheckboxesRadioButtonsPage = pageObjectsManager.getDropdownsCheckboxesRadioButtonsPage()
        await dropdownsCheckboxesRadioButtonsPage.selectOptionFirstDropdownList('JAVA')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionFirstDropdownList('C#')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionFirstDropdownList('Python')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionFirstDropdownList('SQL')
        await dropdownsCheckboxesRadioButtonsPage.optionsCounterFirstDropdown(4)
    });
    test('Second dropdown', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const dropdownsCheckboxesRadioButtonsPage = pageObjectsManager.getDropdownsCheckboxesRadioButtonsPage()
        await dropdownsCheckboxesRadioButtonsPage.selectOptionSecondDropdownList('Eclipse')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionSecondDropdownList('Maven')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionSecondDropdownList('TestNG')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionSecondDropdownList('JUnit')
        await dropdownsCheckboxesRadioButtonsPage.optionsCounterSecondDropdown(4)
    });
    test('Third dropdown', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const dropdownsCheckboxesRadioButtonsPage = pageObjectsManager.getDropdownsCheckboxesRadioButtonsPage()
        await dropdownsCheckboxesRadioButtonsPage.selectOptionThirdDropdownList('HTML')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionThirdDropdownList('CSS')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionThirdDropdownList('JavaScript')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionThirdDropdownList('JQuery')
        await dropdownsCheckboxesRadioButtonsPage.optionsCounterThirdDropdown(4)
    });
    //Checkboxe(s)
    test('Chceck and uncheck checkboxes', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const dropdownsCheckboxesRadioButtonsPage = pageObjectsManager.getDropdownsCheckboxesRadioButtonsPage()
        await dropdownsCheckboxesRadioButtonsPage.checkAndUncheck('Option 1')
        await dropdownsCheckboxesRadioButtonsPage.checkAndUncheck('Option 2')
        await dropdownsCheckboxesRadioButtonsPage.checkAndUncheck('Option 3')
        await dropdownsCheckboxesRadioButtonsPage.checkAndUncheck('Option 4')
        await dropdownsCheckboxesRadioButtonsPage.checkNuberOfCheckboxes(4)
    });
    test('Check all checkboxe(s) and uncheck selected checkboxes', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const dropdownsCheckboxesRadioButtonsPage = pageObjectsManager.getDropdownsCheckboxesRadioButtonsPage()
        await dropdownsCheckboxesRadioButtonsPage.checkAllCheckboxes()
        await dropdownsCheckboxesRadioButtonsPage.uncheckSelectedCheckboxes(['Option 2', 'Option 4'])
    });
    //Radio Button(s)
    test('Click and check every radio button', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const dropdownsCheckboxesRadioButtonsPage = pageObjectsManager.getDropdownsCheckboxesRadioButtonsPage()
        await dropdownsCheckboxesRadioButtonsPage.clickRadioButton('green')
        await dropdownsCheckboxesRadioButtonsPage.clickRadioButton('blue')
        await dropdownsCheckboxesRadioButtonsPage.clickRadioButton('yellow')
        await dropdownsCheckboxesRadioButtonsPage.clickRadioButton('orange')
        await dropdownsCheckboxesRadioButtonsPage.clickRadioButton('purple')
        await dropdownsCheckboxesRadioButtonsPage.checkNuberOfRadioButtons(5)
    });
    //Selected & Disabled
    test('Fruits dropdown', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const dropdownsCheckboxesRadioButtonsPage = pageObjectsManager.getDropdownsCheckboxesRadioButtonsPage()
        await dropdownsCheckboxesRadioButtonsPage.selectOptionFruitDropdownList('Apple')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionFruitDropdownList('Orange')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionFruitDropdownList('Pear')
        await dropdownsCheckboxesRadioButtonsPage.selectOptionFruitDropdownList('Grape')
        await dropdownsCheckboxesRadioButtonsPage.optionsCounterFruitDropdown(4)
    });
    test('Vegetable Radio Buttons', async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page)
        const dropdownsCheckboxesRadioButtonsPage = pageObjectsManager.getDropdownsCheckboxesRadioButtonsPage()
        await dropdownsCheckboxesRadioButtonsPage.clickVegetableRadiobuttons('pumpkin')
        await dropdownsCheckboxesRadioButtonsPage.clickVegetableRadiobuttons('lettuce')
        await dropdownsCheckboxesRadioButtonsPage.clickVegetableRadiobuttons('cabbage')
        await dropdownsCheckboxesRadioButtonsPage.optionsCounterVegetableButtons(3)
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