const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByLabel(/usuario|email|correo/i);
    this.passwordInput = page.getByLabel(/contraseña|password/i);
    this.submitButton = page.getByRole("button", {
      name: /iniciar sesión|login|ingresar/i,
    });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

module.exports = LoginPage;
