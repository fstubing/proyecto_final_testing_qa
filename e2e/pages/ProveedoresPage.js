const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class ProveedoresPage extends BasePage {
  constructor(page) {
    super(page);
    this.btnNuevo = page.getByRole("button", { name: "Crear Proveedor" });
  }

  async navigate() {
    await this.navigateTo("/proveedores");
  }
}

module.exports = { ProveedoresPage };
