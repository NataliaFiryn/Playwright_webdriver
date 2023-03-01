const {ContactUsPage} = require ('./contactUsPage')

class PageObjectsManager {
    constructor (page) { 
        this.page = page;
        this.contactUsPage = new ContactUsPage(this.page);
    }
    getContactUsPage(){
        return this.contactUsPage
    }
}
module.exports = {PageObjectsManager};