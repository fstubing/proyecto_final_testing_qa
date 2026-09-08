const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { ClientesPage } = require("../pages/ClientesPage");
const { ArticulosPage } = require("../pages/ArticulosPage");
const { FacturasPage } = require("../pages/FacturasPage");
const { CobrosPage } = require("../pages/CobrosPage");
const { clienteNuevo } = require("../fixtures/clientes.data");
const { articuloNuevo } = require("../fixtures/articulos.data");
const { facturaNueva } = require("../fixtures/facturas.data");
const { cobroNuevo } = require("../fixtures/cobro.data");

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
    await test.step("1.- Login como Admin", async () => {
      await login.navigate();
      await login.loginAsAdmin();
      await login.assertLoginSuccess();
    });

    // 2. Insercion de Cliente
    await test.step("2.- Insercion de Cliente", async () => {
      await clientes.navigate();
      await clientes.crearCliente(clienteNuevo);
      await clientes.assertClienteCreado(clienteNuevo.name);
    });

    // 3. Gestion y registro de Articulo
    await test.step("3.- Gestion y registro de Articulo", async () => {
      await articulos.navigate();
      await articulos.crearArticulo(articuloNuevo);
      await articulos.assertArticuloCreado(articuloNuevo.nombre);
    });

    // 4. Generacion de Factura
    await test.step("4.- Generacion de Factura", async () => {
      await facturas.navigate();
      await facturas.generarFactura(facturaNueva);
      await facturas.assertFacturaGenerada(
        facturaNueva.clienteNombre,
        facturaNueva.totalEsperado,
      );
    });

    // 5. Procesamiento de Cobro
    await test.step("5.- Procesamiento de Cobro", async () => {
      await cobros.navigate();
      await cobros.procesarCobro(cobroNuevo);
      await cobros.assertCobroRegistrado(
        cobroNuevo.clienteNombre,
        cobroNuevo.totalEsperado,
      );
    });
  });
});
