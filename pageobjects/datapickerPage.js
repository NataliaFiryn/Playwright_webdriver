const { expect } = require('@playwright/test');
class DatapickerPage {
    constructor(page) {
        this.page = page;
        this.dateField = page.locator('input')
        this.dateSwitch = page.locator('.datepicker-switch:visible')
        this.nextButton = page.locator('[class="next"]:visible')
        this.allMonths = page.locator('span[class*=month]')
        this.allDays = page.locator('[class=day]')
    }
    async goToDatapicker() {
        await this.page.goto('/Datepicker/index.html')
    }
    async chceckIfDefaultDateIsTodayDate() {
        let currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-')
        await expect(this.dateField).toHaveJSProperty('value', currentDate)
    }
    async delete(daynumber) { //Do usunięcia
        let date = new Date()
        date.setDate(date.getDate() + daynumber)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleDateString('default', { month: 'long' })
        await this.page.locator('.form-control').click()
        selectDayFromCurrent()
        const page = this.page;
        //console.log(page)

        async function selectDayFromCurrent() {
            console.log(this.futureMonth)

            const monthYear = await (this.page.locator('.datepicker-switch:visible')).textContent()
            if (!monthYear.includes(futureMonth)) {
                await this.page.locator('[class="next"]:visible').click()
                selectDayFromCurrent()
            } else {
                await this.page.locator('.day').locator('text=' + futureDay).click()
            }
        }
        let futureDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-')
        await expect(this.page.locator('input')).toHaveJSProperty('value', futureDate)
    }
    async selectDateFromToday(daynumber) {
        let date = new Date()
        date.setDate(date.getDate() + daynumber)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleDateString('en-us', { month: 'long' })
        await this.dateField.click()

        const selectDayFromCurrent = async () => {

            const monthYear = await (this.dateSwitch).textContent()
            if (!monthYear.includes(futureMonth)) {
                await this.nextButton.click()
                selectDayFromCurrent()
            } else {
                await this.allDays.locator('text=' + futureDay).nth(0).click()
            }
        }
        await selectDayFromCurrent()
        let futureDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-')
        await expect(this.dateField).toHaveJSProperty('value', futureDate)
    }
    async InsertDate(year, month, day) {
        let date = new Date()
        let currentYear = date.getFullYear()
        let shortmonth = month.substring(0, 3)
        let monthYear = month + ' ' + year
        await this.dateField.click()
        await this.dateSwitch.click()
        if (currentYear === year) {
            await this.dateSwitch.toHaveText(year)
        } else {
            let x = year - currentYear
            for (let i = 0; i < x; ++i) {
                await this.nextButton.click()
            }
        }
        await this.allMonths.locator('text=' + shortmonth).click()
        await expect(this.dateSwitch).toHaveJSProperty('textContent', monthYear)
        await this.allDays.locator('text=' + day).nth(0).click()
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let monthNumber = (months.indexOf(month)) + 1
        if (day < 10 && monthNumber > 10) {
            let futureDate = monthNumber + '-0' + day + '-' + year
            await expect(this.dateField).toHaveJSProperty('value', futureDate)
        } else if (day > 10 && monthNumber < 10) {
            let futureDate = '0' + monthNumber + '-' + day + '-' + year
            await expect(this.dateField).toHaveJSProperty('value', futureDate)
        } else if (day < 10 && monthNumber < 10) {
            let futureDate = '0' + monthNumber + '-0' + day + '-' + year
            await expect(this.dateField).toHaveJSProperty('value', futureDate)
        } else {
            let futureDate = monthNumber + '-0' + day + '-' + year
            await expect(this.dateField).toHaveJSProperty('value', futureDate)
        }
    }

};
module.exports = { DatapickerPage };