const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class FacturasPage extends BasePage {
  constructor(page) {
    super(page);
    this.btnNueva = page.getByRole("button", {
      name: "Crear Factura de Venta",
    });
    this.btnBuscarCliente = page.locator(
      "//div[@class='grid grid-cols-1 md:grid-cols-4 gap-6']//div[1]//div[2]//div[1]//div[2]//button[1]",
    );
    this.buscadorCliente = page.getByRole("textbox", {
      name: "Buscar por nombre, código...",
    });
    this.btnBuscadorCliente = page.locator(
      "//button[@type='submit']//*[name()='svg']",
    );
    this.selectDireccionEntrega = page.locator(
      '[name="delivery_address_selector"]',
    );
    this.inputDireccionEntrega = page.getByRole("textbox", {
      name: "Ingrese la nueva dirección de entrega",
    });
    this.inputVendedor = page.locator(
      "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > input:nth-child(1)",
    );
    this.inputMoneda = page.locator(
      "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > input:nth-child(1)",
    );
    this.btnAgregarArticulo = page.getByRole("button", {
      name: "Agregar Ítem",
    });
    this.btnBuscarArticulo = page.locator(
      `//tr[td[contains(., '0')]]//td[1]//button`,
    );
    this.modal = page.getByRole("dialog", { name: "Buscar Cliente" });
    this.buscadorArticulo = page.getByRole("textbox", {
      name: "Buscar por nombre, código...",
    });
    this.btnBuscadorArticulo = page.locator(
      "//button[@type='submit']//*[name()='svg']",
    );
    // this.btnBuscadorArticulo = this.modal.getByRole("button", {
    //   type: "submit",
    // });
    this.inputArticulo = page.locator('input[maxlength="14"]');
    this.inputCantidad = page.locator("//input[@name='quantity']");
    this.msgMonedaOk = page.getByText("'PESOS ARGENTINOS' seleccionado.");
    this.msgVendedorOk = page.getByText("'VENDEDOR 01' seleccionado.");
    this.msgArticuloOk = page.getByText(
      "'Articulo Test marca Testor' seleccionado.",
    );
    this.inputObservaciones = page.locator('[name="notes"]');
    this.btnGenerar = page.getByRole("button", { name: "Guardar Factura" });
    this.msgSuccess = page.getByText("Factura creada con éxito.", {
      exact: true,
    });
    this.buscadorFacturas = page.locator("#search-term");
    this.msgNoResults = page.getByRole("heading", {
      name: "No hay facturas de venta",
    });
  }

  async navigate() {
    await this.navigateTo("/facturas-de-venta");
  }

  async buscarCliente(nombre) {
    await this.clickElement(this.btnBuscarCliente);
    await this.page
      .locator("table thead tr th")
      .filter({ hasText: "Código Cliente" })
      .waitFor({ state: "visible" });
    await this.fillField(this.buscadorCliente, nombre);
    //await this.buscadorArticulo.press("Enter");
    await this.clickElement(this.btnBuscadorCliente);
    await expect(
      this.page.locator("table tbody tr td").filter({ hasText: nombre }),
    ).toBeVisible();
    await this.clickElement(
      this.page.locator("table tbody tr td").filter({ hasText: nombre }),
    );
  }

  async buscarArticulo(nombre) {
    await this.clickElement(this.btnBuscarArticulo);
    await this.page
      .locator("table thead tr th")
      .filter({ hasText: "Precio Compra" })
      .waitFor({ state: "visible" });
    await this.fillField(this.buscadorArticulo, nombre);
    await this.clickElement(this.btnBuscadorArticulo);
    await expect(
      this.page.locator("table tbody tr td").filter({ hasText: nombre }),
    ).toBeVisible();
    await this.clickElement(
      this.page.locator("table tbody tr td").filter({ hasText: nombre }),
    );
  }

  async generarFactura(facturaData) {
    await this.clickElement(this.btnNueva);
    await this.buscarCliente(facturaData.clienteNombre);
    await this.selectOption(
      this.selectDireccionEntrega,
      facturaData.clienteSelectDireccion,
    );
    await this.fillField(
      this.inputDireccionEntrega,
      facturaData.clienteDireccion,
    );
    await this.fillField(this.inputVendedor, facturaData.idVendedor);
    await this.inputVendedor.press("Enter");
    await this.fillField(this.inputMoneda, facturaData.idMoneda);
    await this.inputMoneda.press("Enter");
    await this.clickElement(this.btnAgregarArticulo);
    await this.fillField(this.inputArticulo, facturaData.articuloSku);
    await this.inputArticulo.press("Enter");
    //await this.buscarArticulo(facturaData.articuloNombre);
    await this.fillField(this.inputCantidad, facturaData.articuloCantidad);
    await this.fillField(this.inputObservaciones, facturaData.observaciones);
    await this.msgArticuloOk.waitFor({ state: "hidden" });
    await this.msgVendedorOk.waitFor({ state: "hidden" });
    await this.msgMonedaOk.waitFor({ state: "hidden" });
    await this.clickElement(this.btnGenerar);
  }

  async assertFacturaGenerada(nombre, totalEsperado) {
    await expect(this.msgSuccess).toBeVisible();
    await this.page
      .locator("table thead tr th")
      .filter({ hasText: "Nº Factura" })
      .waitFor({ state: "visible" });
    await this.buscadorFacturas.fill(nombre);
    await this.buscadorFacturas.press("Enter");
    await expect(this.msgNoResults).not.toBeVisible();
    await expect(
      this.page.locator("table tbody tr").filter({ hasText: nombre }),
    ).toBeVisible();
    await this.assertTextContains(
      this.page.locator("table tbody tr").filter({ hasText: nombre }),
      totalEsperado,
    );
  }
}

module.exports = { FacturasPage };
