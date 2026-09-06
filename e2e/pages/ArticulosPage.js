const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class ArticulosPage extends BasePage {
  constructor(page) {
    super(page);
    this.btnNuevo = page.locator("button#btn-nuevo-articulo");
    this.inputCodigo = page.locator("input#codigo");
    this.inputDescripcion = page.locator("input#descripcion");
    this.inputPrecio = page.locator("input#precio");
    this.inputStock = page.locator("input#stock");
    this.btnGuardar = page.locator("button#btn-guardar");
    this.msgSuccess = page.locator(".toast-success");
  }

  async navigate() {
    await this.navigateTo("/articulos");
  }

  async crearArticulo(codigo, desc, precio, stock) {
    await this.clickElement(this.btnNuevo);
    await this.fillField(this.inputCodigo, codigo);
    await this.fillField(this.inputDescripcion, desc);
    await this.fillField(this.inputPrecio, precio);
    await this.fillField(this.inputStock, stock);
    await this.clickElement(this.btnGuardar);
  }

  async assertArticuloCreado(codigo) {
    await expect(this.msgSuccess).toContainText("creado");
    await expect(
      this.page.locator("table tbody tr").filter({ hasText: codigo }),
    ).toBeVisible();
  }
}

module.exports = { ArticulosPage };
