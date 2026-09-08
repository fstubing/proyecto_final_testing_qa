const { test, expect, request } = require("@playwright/test");
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
  let apiContext;
  let authToken;
  const createdResources = [];

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: `${process.env.API_BASE_URL}/`,
    });

    const login = await apiContext.post("login", {
      data: {
        email: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASSWORD,
      },
    });
    expect(login.ok()).toBeTruthy();
    authToken = (await login.json()).access_token;
  });

  test.afterAll(async () => {
    for (const resource of [...createdResources].reverse()) {
      const response = await apiContext.delete(resource.url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok() && response.status() !== 404) {
        console.warn(
          `No se pudo eliminar ${resource.url}: ${response.status()}`,
        );
      }
    }

    await apiContext.dispose();
  });

  test("Debe completar el ciclo: Cliente > Articulo > Factura > Cobro", async ({
    page,
  }) => {
    page.on("response", async (response) => {
      if (
        response.request().method() !== "POST" ||
        !response.url().startsWith(process.env.API_BASE_URL) ||
        response.url().endsWith("/login") ||
        !response.ok()
      ) {
        return;
      }

      try {
        const body = await response.json();
        const id = body?.data?.id ?? body?.id;

        if (id !== undefined && id !== null) {
          const resourceUrl = new URL(response.url());
          resourceUrl.search = "";
          resourceUrl.pathname = `${resourceUrl.pathname.replace(/\/$/, "")}/${id}`;
          createdResources.push({ url: resourceUrl.toString() });
        }
      } catch {
        // Algunas respuestas POST no tienen cuerpo JSON.
      }
    });

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
