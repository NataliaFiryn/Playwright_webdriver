const { expect } = require('@playwright/test');
class ContactUsPage {
    constructor(page) {
        this.page = page;
        this.contactUsLink = page.locator('a#contact-us')
        this.firstNameField = page.locator('[name="first_name"]')
        this.lastNameField = page.locator('[name="last_name"]')
        this.emailField = page.locator('[name="email"]')
        this.commentField = page.locator('[name="message"]')
        this.resetButton = page.locator('[type="reset"]')
        this.submitButton = page.locator('[type="submit"]')
        this.contactReplay = page.locator('#contact_reply h1')
        this.errorReplay = page.locator('body')

    }
    async goToContactUs() {
        await this.page.goto('/')
        await this.contactUsLink.evaluate((el) => el.removeAttribute('target'))
        await this.contactUsLink.click()
    }
    async fillUpContactUsForm(firstName, lastName, email, comment) {
        if (firstName !== null) await this.firstNameField.type(firstName)
        if (lastName !== null) await this.lastNameField.type(lastName)
        if (email !== null) await this.emailField.type(email)
        if (comment !== null) await this.commentField.type(comment)
    }
    async resetEnteredData() {
        await this.resetButton.click()
        await expect(this.firstNameField).toBeEmpty()
        await expect(this.lastNameField).toBeEmpty()
        await expect(this.emailField).toBeEmpty()
        await expect(this.commentField).toBeEmpty()
    }
    async submitContactUsForm() {
        await this.submitButton.click()

    }
    async messageFormSubmitedCorrect() {
        await expect(this.contactReplay).toHaveText('Thank You for your Message!')
    }
    async errorMessageAllFieldsRequired() {
        await expect(this.errorReplay).toContainText('Error: all fields are required')
    }
    async errorMessageInvalidEmail() {
        await expect(this.errorReplay).toContainText('Error: Invalid email address')
    }
    async emailValidation(invalidEmail) {
        for (let i = 0; i < invalidEmail.length; ++i) {
            await this.firstNameField.type('Jane')
            await this.lastNameField.type('Doe')
            await this.emailField.type(invalidEmail[i])
            await this.commentField.type('Comment')
            await this.submitButton.click()
            await expect(this.errorReplay).toHaveText('Error: Invalid email address')
            await this.page.goBack()
            await this.resetButton.click()
        }
    }
}
module.exports = { ContactUsPage };