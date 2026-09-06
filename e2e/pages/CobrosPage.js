const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class CobrosPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectFactura = page.locator("select#factura");
    this.inputMonto = page.locator("input#monto");
    this.selectMetodo = page.locator("select#metodo-pago");
    this.btnRegistrar = page.locator("button#btn-registrar-cobro");
    this.msgSuccess = page.locator(".toast-success");
  }

  async navigate() {
    await this.navigateTo("/cobros");
  }

  async procesarCobro(factura, monto, metodo) {
    await this.selectFactura.selectOption({ label: factura });
    await this.fillField(this.inputMonto, monto);
    await this.selectMetodo.selectOption({ label: metodo });
    await this.clickElement(this.btnRegistrar);
  }

  async assertCobroRegistrado() {
    await expect(this.msgSuccess).toContainText("Cobro registrado");
  }
}

module.exports = { CobrosPage };
