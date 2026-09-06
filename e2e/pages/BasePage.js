const { expect } = require("@playwright/test");

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path) {
    await this.page.goto(path);
    await this.page.waitForLoadState("networkidle");
  }

  async clickElement(locator) {
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  async fillField(locator, value) {
    await locator.waitFor({ state: "visible" });
    await locator.fill(value);
  }

  async selectOption(locator, optionValue) {
    await locator.waitFor({ state: "visible" });
    await locator.selectOption(optionValue);
  }

  async checkCheckbox(locator) {
    await locator.waitFor({ state: "visible" });
    await locator.check();
  }

  async assertTextContains(locator, text) {
    await expect(locator).toContainText(text);
  }
}

module.exports = { BasePage };
