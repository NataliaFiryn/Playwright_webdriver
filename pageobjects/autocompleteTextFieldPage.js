const { expect } = require('@playwright/test');
class AutocompleteTextFieldPage {
    constructor(page) {
        this.page = page;
        this.textField = page.locator('#myInput[type="text"]')
        this.autocompleteListElements = page.locator('#myInputautocomplete-list strong')
        this.submitButton = page.locator('#submit-button')
    }
    async goToAutocompleteTextField() {
        await this.page.goto('/Autocomplete-TextField/autocomplete-textfield.html')
    }
    async typeText(inputText){
    await this.textField.type(inputText)
    const listElementsCounter = await this.autocompleteListElements.count()
    for(let i = 0; i <listElementsCounter; ++i){
        await expect(this.autocompleteListElements.nth(i)).toHaveText(inputText)
    }
    }
    async chooseElementfromAutocompleteList(eqOfElement){
        await this.autocompleteListElements.nth(eqOfElement).click()
    }
    async submitFoodItem(){
        await this.submitButton.click()
        await expect (this.textField).toBeEmpty()

    }
}
module.exports = { AutocompleteTextFieldPage };