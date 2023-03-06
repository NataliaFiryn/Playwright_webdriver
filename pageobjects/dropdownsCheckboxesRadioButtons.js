const { expect } = require('@playwright/test');
class DropdownsCheckboxesRadioButtonsPage {
    constructor(page) {
        this.page = page;
        this.javaDropdownList = page.locator('.container .thumbnail #dropdowm-menu-1')
        this.eclipseDropdownList = page.locator('.container .thumbnail #dropdowm-menu-2')
        this.htmlDropdownList = page.locator('.container .thumbnail #dropdowm-menu-3')
        this.checkBoxesContainer = page.locator('.container .thumbnail #checkboxes')
        this.allCheckBoxes = page.locator('#checkboxes [type="checkbox"]')
        this.radioButtonsContainer = page.locator('.container .thumbnail #radio-buttons')
        this.fruitDropdownList = page.locator('.container .thumbnail #fruit-selects')
        this.vegetableButtons = page.locator('.container .thumbnail #radio-buttons-selected-disabled')
    }
    async goToDropdownsCheckboxesRadioButtonsPage() {
        await this.page.goto('/Dropdown-Checkboxes-RadioButtons/index.html')
    }
    async selectOptionFirstDropdownList(itemName) {
        const dropdownItem = await this.javaDropdownList.locator('text=' + itemName)
        const itemValue = {
            "JAVA": "java",
            "C#": "c#",
            "Python": "python",
            "SQL": "sql"
        }
        await this.javaDropdownList.selectOption(itemName)
        await expect(dropdownItem).toHaveJSProperty('selected', true)
        await expect(dropdownItem).toHaveJSProperty('value', itemValue[itemName])
    }
    async selectOptionSecondDropdownList(itemName) {
        const dropdownItem = await this.eclipseDropdownList.locator('text=' + itemName)
        const itemValue = {
            "Eclipse": "eclipse",
            "Maven": "maven",
            "TestNG": "testng",
            "JUnit": "junit"
        }
        await this.eclipseDropdownList.selectOption(itemName)
        await expect(dropdownItem).toHaveJSProperty('selected', true)
        await expect(dropdownItem).toHaveJSProperty('value', itemValue[itemName])
    }
    async selectOptionThirdDropdownList(itemName) {
        const dropdownItem = await this.htmlDropdownList.locator('text=' + itemName)
        const itemValue = {
            "HTML": "html",
            "CSS": "css",
            "JavaScript": "javascript",
            "JQuery": "jquery"
        }
        await this.htmlDropdownList.selectOption(itemName)
        await expect(dropdownItem).toHaveJSProperty('selected', true)
        await expect(dropdownItem).toHaveJSProperty('value', itemValue[itemName])
    }
    async optionsCounterFirstDropdown(number) {
        await expect(this.javaDropdownList.locator('option')).toHaveCount(number)
    }
    async optionsCounterSecondDropdown(number) {
        await expect(this.eclipseDropdownList.locator('option')).toHaveCount(number)
    }
    async optionsCounterThirdDropdown(number) {
        await expect(this.htmlDropdownList.locator('option')).toHaveCount(number)
    }
    async checkAndUncheck(checkboxName) {
        const checkbox = await this.checkBoxesContainer.locator('text=' + checkboxName)
        if (checkboxName === 'Option 3') {
            await checkbox.click()
            expect(await checkbox.isChecked()).toBeFalsy
            await checkbox.click()
            await expect(checkbox).toBeChecked()
        } else {
            await checkbox.click()
            await expect(checkbox).toBeChecked()
            await checkbox.click()
            expect(await checkbox.isChecked()).toBeFalsy
        }
    }
    async checkNuberOfCheckboxes(number) {
        await expect(this.allCheckBoxes).toHaveCount(number)
    }
    async checkAllCheckboxes() {
        const checkboxCouter = await this.allCheckBoxes.count()
        for (let i = 0; i < checkboxCouter; ++i) {
            const checkbox = this.allCheckBoxes.nth(i)
            if (!(await checkbox.isChecked())) {
                await checkbox.click()
                await expect(checkbox).toBeChecked()
            }
        }
    }
    async uncheckSelectedCheckboxes(checkboxesArray) {
        for (let i = 0; i < checkboxesArray.length; ++i) {
            const checkbox = checkboxesArray[i]
            await this.checkBoxesContainer.locator('text=' + checkbox).click()
            expect(await this.checkBoxesContainer.locator('text=' + checkbox).isChecked()).toBeFalsy
        }
    }
    async clickRadioButton(buttonName) {
        await expect(this.radioButtonsContainer.locator('[value=' + buttonName + ']')).toHaveJSProperty('checked', false)
        await this.radioButtonsContainer.locator('[value=' + buttonName + ']').click()
        await expect(this.radioButtonsContainer.locator('[value=' + buttonName + ']')).toHaveJSProperty('checked', true)
    }
    async checkNuberOfRadioButtons(number) {
        await expect(this.radioButtonsContainer.locator('input')).toHaveCount(number)
    }
    async selectOptionFruitDropdownList(fruitName) {
        const dropdownItem = await this.fruitDropdownList.locator('text=' + fruitName)
        const fruitValue = {
            "Apple": "apple",
            "Orange": "orange",
            "Pear": "pear",
            "Grape": "grape"
        }
        if (fruitName == 'Orange') {
            await expect(dropdownItem).toHaveJSProperty('disabled', true)
            await expect(dropdownItem).toHaveJSProperty('value', fruitValue[fruitName])
        } else {
            await this.fruitDropdownList.selectOption(fruitName)
            await expect(dropdownItem).toHaveJSProperty('selected', true)
            await expect(dropdownItem).toHaveJSProperty('value', fruitValue[fruitName])
        }
    }
    async optionsCounterFruitDropdown(number) {
        await expect(this.fruitDropdownList.locator('option')).toHaveCount(number)
    }
    async clickVegetableRadiobuttons(buttonName) {
        if (buttonName === 'pumpkin') {
            await expect(this.vegetableButtons.locator('[value=' + buttonName + ']')).toHaveJSProperty('checked', true)
        } else {
            await expect(this.vegetableButtons.locator('[value=' + buttonName + ']')).toHaveJSProperty('checked', false)
        }
        if (buttonName === 'cabbage') {
            await expect(this.vegetableButtons.locator('[value=' + buttonName + ']')).toHaveJSProperty('disabled', true)
        } else {
            await this.vegetableButtons.locator('[value=' + buttonName + ']').click()
            await expect(this.vegetableButtons.locator('[value=' + buttonName + ']')).toHaveJSProperty('checked', true)
        }
    }
    async optionsCounterVegetableButtons(number) {
        await expect(this.vegetableButtons.locator('input')).toHaveCount(number)
    }
}
module.exports = { DropdownsCheckboxesRadioButtonsPage };