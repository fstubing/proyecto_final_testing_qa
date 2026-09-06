require("dotenv").config();
const request = require("supertest");
const apiUrl = process.env.API_BASE_URL;
const {
  clienteNuevo,
  clienteActualizado,
  clienteInvalido,
} = require("../fixtures/clientes.data");

describe("API - Modulo Clientes (CRUD Completo)", () => {
  let clienteId;
  let clienteEmail;
  let clienteCustomerCode;

  let authToken;

  beforeAll(async () => {
    const login = await request(apiUrl).post("/login").send({
      email: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASSWORD,
    });
    authToken = login.body.access_token;
  });

  // ============================================
  // 1. CREAR CLIENTE (POST)
  // ============================================
  describe("POST /clients - Crear cliente", () => {
    test("Debe crear un cliente nuevo y retornar 201", async () => {
      const response = await request(apiUrl)
        .post("/clients")
        .send(clienteNuevo)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${authToken}`);

      const data = response.body.data;
      // Validar status code
      expect(response.status).toBe(201);

      // Validar estructura de respuesta
      expect(data).toHaveProperty("id");
      expect(data).toHaveProperty("name");
      expect(data).toHaveProperty("email");
      expect(data).toHaveProperty("phone");

      // Validar datos persistidos
      expect(data.name).toBe(clienteNuevo.name);
      expect(data.email).toBe(clienteNuevo.email);
      expect(data.phone).toBe(clienteNuevo.phone);

      // Guardar variables para siguientes tests
      clienteId = data.id;
      clienteCustomerCode = data.customer_code;
      clienteEmail = data.email;
    });

    test("Debe rechazar crear cliente sin nombre (422)", async () => {
      const response = await request(apiUrl)
        .post("/clients")
        .send(clienteInvalido)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(422);
    });
  });

  // ============================================
  // 2. OBTENER CLIENTE POR ID (GET)
  // ============================================
  describe("GET /clients/:id - Obtener cliente", () => {
    test("Debe retornar el cliente creado con status 200", async () => {
      const response = await request(apiUrl)
        .get(`/clients/${clienteId}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${authToken}`);

      const data = response.body.data;
      expect(response.status).toBe(200);
      expect(data).toHaveProperty("id", clienteId);
      expect(data).toHaveProperty("name", clienteNuevo.name);
      expect(data).toHaveProperty("email", clienteEmail);
      expect(data).toHaveProperty("customer_code", clienteCustomerCode);
    });

    test("Debe retornar 401 para cliente inexistente", async () => {
      const response = await request(apiUrl)
        .get("/clients/999999")
        .set("Accept", "application/json");

      expect(response.status).toBe(401);
    });
  });

  // ============================================
  // 3. ACTUALIZAR CLIENTE (PUT)
  // ============================================
  describe("PUT /clients/:id - Actualizar cliente", () => {
    test("Debe actualizar el cliente y retornar 200", async () => {
      const response = await request(apiUrl)
        .put(`/clients/${clienteId}`)
        .send(clienteActualizado)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${authToken}`);
      const data = response.body.data;
      expect(response.status).toBe(200);
      expect(data).toHaveProperty("id", clienteId);
      expect(data.name).toBe(clienteActualizado.name);
      expect(data.email).toBe(clienteActualizado.email);
      expect(data.phone).toBe(clienteActualizado.phone);

      // Actualizar email para validacion posterior
      clienteEmail = data.email;
    });

    test("Debe reflejar los cambios al consultar nuevamente", async () => {
      const response = await request(apiUrl)
        .get(`/clients/${clienteId}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${authToken}`);
      const data = response.body.data;
      expect(response.status).toBe(200);
      expect(data.name).toBe(clienteActualizado.name);
      expect(data.email).toBe(clienteActualizado.email);
    });
  });

  // ============================================
  // 4. ELIMINAR CLIENTE (DELETE)
  // ============================================
  describe("DELETE /clients/:id - Eliminar cliente", () => {
    test("Debe eliminar el cliente y retornar 204", async () => {
      const response = await request(apiUrl)
        .delete(`/clients/${clienteId}`)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(204);
    });

    test("Debe retornar 401 al intentar obtener el cliente eliminado", async () => {
      const response = await request(apiUrl)
        .get(`/clients/${clienteId}`)
        .set("Accept", "application/json");

      expect(response.status).toBe(401);
    });
  });
});
