const BasePage = require("./BasePage");

class CobrosPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole("heading", { name: /cobros/i });
  }

  async open() {
    await this.goto("/cobros");
  }
}

module.exports = CobrosPage;
