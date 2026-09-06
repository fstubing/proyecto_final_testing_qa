const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class ClientesPage extends BasePage {
  constructor(page) {
    super(page);
    this.btnNuevo = page.getByRole("button", { name: "Crear Cliente" });
    this.inputNombre = page.locator("input#nombre");
    this.inputEmail = page.locator("input#email");
    this.inputTelefono = page.locator("input#telefono");
    this.btnGuardar = page.locator("button#btn-guardar");
    this.tblClientes = page.locator("table tbody tr");
    this.msgSuccess = page.locator(".toast-success");
  }

  async navigate() {
    await this.navigateTo("/clientes");
  }

  async crearCliente(nombre, email, telefono) {
    await this.clickElement(this.btnNuevo);
    await this.fillField(this.inputNombre, nombre);
    await this.fillField(this.inputEmail, email);
    await this.fillField(this.inputTelefono, telefono);
    await this.clickElement(this.btnGuardar);
  }

  async assertClienteCreado(nombre) {
    await expect(this.msgSuccess).toContainText("creado");
    await expect(this.tblClientes.filter({ hasText: nombre })).toBeVisible();
  }
}

module.exports = { ClientesPage };
