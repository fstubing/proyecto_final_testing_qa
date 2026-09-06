const BasePage = require("./BasePage");

class ClientesPage extends BasePage {
  constructor(page) {
    super(page);
    this.heading = page.getByRole("heading", { name: /clientes/i });
  }

  async open() {
    await this.goto("/clientes");
  }
}

module.exports = ClientesPage;
