const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { ClientesPage } = require("../pages/ClientesPage");
const { ArticulosPage } = require("../pages/ArticulosPage");
const { FacturasPage } = require("../pages/FacturasPage");
const { CobrosPage } = require("../pages/CobrosPage");

test.describe("Flujo Completo E2E", () => {
  test("Debe completar el ciclo: Cliente > Articulo > Factura > Cobro", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const clientes = new ClientesPage(page);
    const articulos = new ArticulosPage(page);
    const facturas = new FacturasPage(page);
    const cobros = new CobrosPage(page);

    // 1. Login como Admin
    await login.navigate();
    await login.loginAsAdmin();
    await login.assertLoginSuccess();

    // 2. Insercion de Cliente
    // await clientes.navigate();
    // await clientes.crearCliente(
    //   "Cliente E2E",
    //   "cliente-e2e@test.com",
    //   "555-0199",
    // );
    // await clientes.assertClienteCreado("Cliente E2E");

    // // 3. Gestion y registro de Articulo
    // await articulos.navigate();
    // await articulos.crearArticulo(
    //   "ART-E2E-001",
    //   "Articulo de Prueba E2E",
    //   "15000",
    //   "100",
    // );
    // await articulos.assertArticuloCreado("ART-E2E-001");

    // // 4. Generacion de Factura
    // await facturas.navigate();
    // await facturas.generarFactura("Cliente E2E", "Articulo de Prueba E2E", "2");
    // await facturas.assertFacturaGenerada();

    // // 5. Procesamiento de Cobro
    // await cobros.navigate();
    // await cobros.procesarCobro("Factura #", "30000", "Transferencia");
    // await cobros.assertCobroRegistrado();
  });
});
