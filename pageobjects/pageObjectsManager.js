const {ContactUsPage} = require ('./contactUsPage');
const { DatapickerPage } = require('./datapickerPage');

class PageObjectsManager {
    constructor (page) { 
        this.page = page
        this.contactUsPage = new ContactUsPage(this.page)
        this.datapickerPage = new DatapickerPage(this.page)
    }
    getContactUsPage(){
        return this.contactUsPage
    }
    getDatapickerPage(){
        return this.datapickerPage
    }
}
module.exports = {PageObjectsManager};