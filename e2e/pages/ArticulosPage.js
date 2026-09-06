const BasePage = require("./BasePage");

class ArticulosPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole("heading", { name: /artículos|articulos/i });
  }

  async open() {
    await this.goto("/articulos");
  }
}

module.exports = ArticulosPage;
