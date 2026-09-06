const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");

test.describe("Seguridad y permisos", () => {
  test.skip(
    !process.env.BASE_URL,
    "Define BASE_URL para ejecutar pruebas E2E.",
  );

  test("rechaza credenciales inválidas", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto("/login");
    await loginPage.login("usuario-invalido", "contraseña-invalida");

    await expect(
      page.getByText(/credenciales inválidas|acceso denegado|error/i),
    ).toBeVisible();
  });
});
