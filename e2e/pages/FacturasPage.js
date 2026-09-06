const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class FacturasPage extends BasePage {
  constructor(page) {
    super(page);
    this.btnNueva = page.locator("button#btn-nueva-factura");
    this.selectCliente = page.locator("select#cliente");
    this.btnAgregarArticulo = page.locator("button#btn-agregar-articulo");
    this.selectArticulo = page.locator("select#articulo");
    this.inputCantidad = page.locator("input#cantidad");
    this.btnGenerar = page.locator("button#btn-generar");
    this.lblTotal = page.locator(".total-factura");
    this.msgSuccess = page.locator(".toast-success");
  }

  async navigate() {
    await this.navigateTo("/facturas");
  }

  async generarFactura(cliente, articulo, cantidad) {
    await this.clickElement(this.btnNueva);
    await this.selectCliente.selectOption({ label: cliente });
    await this.clickElement(this.btnAgregarArticulo);
    await this.selectArticulo.selectOption({ label: articulo });
    await this.fillField(this.inputCantidad, cantidad);
    await this.clickElement(this.btnGenerar);
  }

  async assertFacturaGenerada() {
    await expect(this.msgSuccess).toContainText("Factura generada");
    await expect(this.lblTotal).toBeVisible();
  }
}

module.exports = { FacturasPage };
