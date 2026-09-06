const BasePage = require("./BasePage");

class FacturasPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole("heading", { name: /facturas/i });
  }

  async open() {
    await this.goto("/facturas");
  }
}

module.exports = FacturasPage;
