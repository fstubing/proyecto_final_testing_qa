const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class ArticulosPage extends BasePage {
  constructor(page) {
    super(page);
    this.btnNuevo = page.getByRole("button", { name: "Crear Artículo" });
    this.inputCodigo = page.getByRole("textbox", { name: "Código (SKU) *" });
    this.inputNombre = page.getByRole("textbox", {
      name: "Nombre / Descripción Breve *",
    });
    this.inputDescripcion = page.getByRole("textbox", {
      name: "Descripción Larga",
    });
    this.selectLinea = page.locator("#line");
    this.selectCategoria = page.locator("#category");
    this.inputPrecioVenta = page.getByRole("textbox", {
      name: "Precio de Venta",
    });
    this.inputStock = page.getByRole("textbox", { name: "Stock Actual" });
    this.checkIva = page.locator("#tax-1");
    this.btnGuardar = page.getByRole("button", { name: "Guardar Cambios" });
    this.msgSuccess = page.getByText("Artículo guardado con éxito!", {
      exact: true,
    });
    this.buscadorArticulos = page.getByRole("textbox", { name: "Buscar" });
    this.btnBuscar = page.getByRole("button", { name: "Buscar", exact: true });
    this.msgNoResults = page.getByRole("heading", { name: "No hay artículos" });
  }

  async navigate() {
    await this.navigateTo("/articulos");
  }

  async crearArticulo(articuloData) {
    await this.clickElement(this.btnNuevo);
    await this.fillField(this.inputCodigo, articuloData.sku);
    await this.fillField(this.inputNombre, articuloData.nombre);
    await this.fillField(this.inputDescripcion, articuloData.descripcion);
    await this.selectOption(this.selectLinea, articuloData.linea);
    await this.selectOption(this.selectCategoria, articuloData.categoria);
    await this.fillField(this.inputPrecioVenta, articuloData.precioVenta);
    await this.fillField(this.inputStock, articuloData.stock);
    await this.checkCheckbox(this.checkIva);
    await this.clickElement(this.btnGuardar);
  }

  async assertArticuloCreado(nombre) {
    await expect(this.msgSuccess).toBeVisible();
    await this.buscadorArticulos.fill(nombre);
    await this.clickElement(this.btnBuscar);
    await expect(this.msgNoResults).not.toBeVisible();
    await expect(
      this.page.locator("table tbody tr").filter({ hasText: nombre }),
    ).toBeVisible();
  }
}

module.exports = { ArticulosPage };
