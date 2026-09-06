const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class ClientesPage extends BasePage {
  constructor(page) {
    super(page);
    this.btnNuevo = page.getByRole("button", { name: "Crear Cliente" });
    this.inputCuit = page.getByRole("textbox", { name: "CUIT *" });
    this.inputNombre = page.getByRole("textbox", {
      name: "Nombre o Razón Social *",
    });
    this.selectCondicionTributaria = page.locator("#tax");
    this.selectRetieneIva = page.locator("#retieniva");
    this.inputDomicilioFiscal = page.getByRole("textbox", {
      name: "Domicilio Fiscal",
    });
    this.inputCodigoPostal = page.getByRole("textbox", {
      name: "Código Postal",
    });
    this.inputLocalidad = page.locator("#city");
    this.selectProvincia = page.locator("#district");
    this.inputEmail = page.locator("#email");
    this.inputTelefono = page.locator("#phone");
    this.checkImpuesto = page.locator("#tax-1");
    this.btnGuardar = page.getByRole("button", { name: "Guardar Cambios" });
    this.buscadorClientes = page.getByRole("textbox", { name: "Buscar" });
    this.btnBuscar = page.locator('span:has-text("Buscar")');
    this.msgNoResults = page.getByRole("heading", { name: "No hay clientes" });
    this.msgSuccess = page.getByText("Cliente guardado con éxito!", {
      exact: true,
    });
  }

  async navigate() {
    await this.navigateTo("/clientes");
  }

  async crearCliente(clienteData) {
    await this.clickElement(this.btnNuevo);
    await this.fillField(this.inputCuit, clienteData.cuit);
    await this.fillField(this.inputNombre, clienteData.name);
    await this.selectOption(this.selectCondicionTributaria, clienteData.tax);
    await this.selectOption(this.selectRetieneIva, clienteData.retieniva);
    await this.fillField(this.inputDomicilioFiscal, clienteData.address);
    await this.fillField(this.inputCodigoPostal, clienteData.zip);
    await this.fillField(this.inputLocalidad, clienteData.city);
    await this.selectOption(this.selectProvincia, clienteData.district);
    await this.fillField(this.inputEmail, clienteData.email);
    await this.fillField(this.inputTelefono, clienteData.phone);
    await this.checkCheckbox(this.checkImpuesto);
    await this.clickElement(this.btnGuardar);
  }

  async assertClienteCreado(nombre) {
    await expect(this.msgSuccess).toBeVisible();
    await this.buscadorClientes.fill(nombre);
    await this.clickElement(this.btnBuscar);
    await expect(this.msgNoResults).not.toBeVisible();
  }
}

module.exports = { ClientesPage };
