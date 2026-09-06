const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { ProveedoresPage } = require("../pages/ProveedoresPage");

test.describe("Seguridad y Control de Acceso", () => {
  test("Admin debe acceder al modulo de Proveedores", async ({ page }) => {
    const login = new LoginPage(page);
    const proveedores = new ProveedoresPage(page);

    await login.navigate();
    await login.loginAsAdmin();
    await login.assertLoginSuccess();
    await proveedores.navigate();
    await expect(proveedores.btnNuevo).toBeVisible();
  });

  test("Vendedor debe acceder con credenciales validas", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.loginAsVendedor();
    await login.assertLoginSuccess();
  });

  test("Credenciales invalidas deben rechazar el acceso", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login("invalido@test.com", "wrongpass");
    await login.assertAccessDenied();
  });
});
