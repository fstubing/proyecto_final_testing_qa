class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = "/") {
    await this.page.goto(path);
  }

  async expectUrl(path) {
    await this.page.waitForURL(`**${path}`);
  }
}

module.exports = BasePage;
