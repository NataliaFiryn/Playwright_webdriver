const { ContactUsPage } = require('./contactUsPage');
const { DatapickerPage } = require('./datapickerPage');
const { AutocompleteTextFieldPage } = require('./autocompleteTextFieldPage')
const { DropdownsCheckboxesRadioButtonsPage } = require('./dropdownsCheckboxesRadioButtons')
const { AjaxLoaderPage } = require('./ajaxLoaderPage')

class PageObjectsManager {
    constructor(page) {
        this.page = page
        this.contactUsPage = new ContactUsPage(this.page)
        this.datapickerPage = new DatapickerPage(this.page)
        this.autocompleteTextFieldPage = new AutocompleteTextFieldPage(this.page)
        this.dropdownsCheckboxesRadioButtonsPage = new DropdownsCheckboxesRadioButtonsPage(this.page)
        this.ajaxLoaderPage = new AjaxLoaderPage(this.page)
    }
    getContactUsPage() {
        return this.contactUsPage
    }
    getDatapickerPage() {
        return this.datapickerPage
    }
    getAutocompleteTextFieldPage() {
        return this.autocompleteTextFieldPage
    }
    getDropdownsCheckboxesRadioButtonsPage() {
        return this.dropdownsCheckboxesRadioButtonsPage
    }
    getAjaxLoaderPage() {
        return this.ajaxLoaderPage
    }
}
module.exports = { PageObjectsManager };