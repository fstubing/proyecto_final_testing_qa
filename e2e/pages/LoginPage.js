const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.inputEmail = page.getByRole("textbox", { name: "Email" });
    this.inputPassword = page.getByLabel("Contraseña");
    this.btnSubmit = page.getByRole("button", { name: "Ingresar" });
    this.lblWelcome = page.getByText("Bienvenido al sistema ERP.", {
      exact: true,
    });
    this.lblError = page.getByRole("alert");
  }

  async navigate() {
    await this.navigateTo("/login");
  }

  async login(email, password) {
    await this.fillField(this.inputEmail, email);
    await this.fillField(this.inputPassword, password);
    await this.clickElement(this.btnSubmit);
  }

  async loginAsAdmin() {
    await this.login("tae@testing.com", "Tae@2026");
  }

  async loginAsVendedor() {
    await this.login("vendedor@testing.com", "Tae@2026");
  }

  async assertLoginSuccess() {
    await expect(this.lblWelcome).toBeVisible();
  }

  async assertAccessDenied() {
    await expect(this.lblError).toBeVisible();
  }
}

module.exports = { LoginPage };
