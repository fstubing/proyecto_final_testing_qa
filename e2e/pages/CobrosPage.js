const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class CobrosPage extends BasePage {
  constructor(page) {
    super(page);
    this.btnNuevoCobro = page.getByRole("button", { name: "Crear Cobranza" });
    this.btnBuscaCliente = page.locator("button[aria-label='Buscar'] svg");
    this.inputBuscaCliente = page.getByRole("textbox", {
      name: "Buscar por nombre, código...",
    });
    this.fechaCobro = page.getByLabel("Fecha de Cobro");
    this.inputMontoAplicar = page.getByRole("textbox", { name: "0.00" });
    this.btnAnadirMedioPago = page.getByRole("button", {
      name: "Añadir Medio",
    });
    this.selectMedioPago = page.getByRole("combobox", { name: "Medio" });
    this.btnValorMedioPago = page.getByRole("button", {
      name: "Completar valor con el faltante respecto al total aplicado",
    });
    this.btnRegistrarCobro = page.getByRole("button", {
      name: "Guardar Cobranza",
    });
    this.msgSuccess = page.getByText("Cobranza guardada con éxito!", {
      exact: true,
    });
    this.inputbuscadorCobros = page.getByRole("textbox", { name: "Buscar" });
    this.btnbuscadorCobros = page.getByRole("button", { name: "Buscar" });
    this.msgNoResults = page.getByRole("heading", { name: "No hay cobranzas" });
  }

  async navigate() {
    await this.navigateTo("/cobranzas");
  }

  async buscarCliente(nombre) {
    await this.clickElement(this.btnBuscaCliente);
    await this.page
      .locator("table thead tr th")
      .filter({ hasText: "Código Cliente" })
      .waitFor({ state: "visible" });
    await this.fillField(this.inputBuscaCliente, nombre);
    await this.inputBuscaCliente.press("Enter");
    //await this.clickElement(this.btnBuscadorCliente);
    await expect(
      this.page.locator("table tbody tr td").filter({ hasText: nombre }),
    ).toBeVisible();
    await this.clickElement(
      this.page.locator("table tbody tr td").filter({ hasText: nombre }),
    );
  }

  async procesarCobro(cobroData) {
    await this.clickElement(this.btnNuevoCobro);
    await this.buscarCliente(cobroData.clienteNombre);
    await this.page
      .locator("table thead tr th")
      .filter({ hasText: "Factura" })
      .waitFor({ state: "visible" });
    await this.fechaCobro.pressSequentially(cobroData.fechaCobro);
    await this.fillField(this.inputMontoAplicar, cobroData.montoAplicar);
    await this.clickElement(this.btnAnadirMedioPago);
    await this.selectOption(this.selectMedioPago, cobroData.medioPago);
    await this.clickElement(this.btnValorMedioPago);
    await this.clickElement(this.btnRegistrarCobro);
  }

  async assertCobroRegistrado(nombre, totalEsperado) {
    await expect(this.msgSuccess).toBeVisible();
    await this.page
      .locator("table thead tr th")
      .filter({ hasText: "Cliente" })
      .waitFor({ state: "visible" });
    await this.inputbuscadorCobros.fill(nombre);
    await this.inputbuscadorCobros.press("Enter");
    //await this.clickElement(this.btnbuscadorCobros);
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

module.exports = { CobrosPage };
