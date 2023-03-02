const {ContactUsPage} = require ('./contactUsPage');
const { DatapickerPage } = require('./datapickerPage');
const { AutocompleteTextFieldPage} = require('./autocompleteTextFieldPage')

class PageObjectsManager {
    constructor (page) { 
        this.page = page
        this.contactUsPage = new ContactUsPage(this.page)
        this.datapickerPage = new DatapickerPage(this.page)
        this.autocompleteTextFieldPage = new AutocompleteTextFieldPage(this.page)
    }
    getContactUsPage(){
        return this.contactUsPage
    }
    getDatapickerPage(){
        return this.datapickerPage
    }
    getAutocompleteTextFieldPage(){
        return this.autocompleteTextFieldPage
    }
}
module.exports = {PageObjectsManager};