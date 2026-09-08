# Proyecto Final de Testing

Proyecto de automatizacion de pruebas para un sistema ERP. Incluye pruebas de API, pruebas end-to-end (E2E) sobre la interfaz web y escenarios BDD para documentar el comportamiento esperado de una clinica veterinaria.

## Alcance

- **API:** pruebas CRUD del modulo de clientes usando Jest y SuperTest.
- **E2E:** pruebas con Playwright para validar el flujo completo de cliente, articulo, factura y cobro.
- **Seguridad y permisos:** validacion de acceso para usuarios administrador y vendedor, ademas del rechazo de credenciales invalidas.
- **BDD:** escenario documentado para reservar y cancelar horas veterinarias en `bdd/gestion-reseva-hora.feature`.
- **Reportes:** reportes HTML de Jest y Playwright, junto con trazas, capturas y videos cuando corresponde.

## Requisitos

- Node.js 18 o superior.
- npm.
- Acceso al frontend y a la API configurados en las variables de entorno.
- Navegadores de Playwright instalados para ejecutar las pruebas E2E.

## Instalacion

1. Instalar las dependencias:

   ```bash
   npm install
   ```

2. Crear un archivo `.env` en la raiz del proyecto. No se deben versionar credenciales reales.

   ```env
   BASE_URL=https://tu-frontend.example.com
   API_BASE_URL=https://tu-backend.example.com/api
   ADMIN_USER=usuario-administrador@example.com
   ADMIN_PASSWORD=tu-clave
   VENDEDOR_USER=usuario-vendedor@example.com
   VENDEDOR_PASSWORD=tu-clave
   ```

3. Instalar los navegadores de Playwright si es necesario:

   ```bash
   npx playwright install
   ```

## Ejecucion de pruebas

### Pruebas de API

Ejecutar la suite de clientes:

```bash
npm run test:api
```

Ejecutar Jest en modo observacion:

```bash
npm run test:api:watch
```

Generar cobertura:

```bash
npm run test:api:coverage
```

Las pruebas de API autentican contra `/login`, ejercitan el CRUD de clientes y validan respuestas exitosas y de error.

### Pruebas E2E

Ejecutar todas las pruebas E2E:

```bash
npm run test:e2e
```

El conjunto E2E utiliza Chromium y valida:

1. El acceso de administrador y vendedor.
2. El rechazo de credenciales invalidas.
3. La creacion de un cliente y un articulo.
4. La generacion de una factura.
5. El registro de un cobro.

El flujo completo captura los recursos creados durante la prueba y los elimina mediante la API en `afterAll()`, en orden inverso, para evitar dejar datos de prueba en el sistema.

Para abrir el ultimo reporte HTML:

```bash
npm run test:e2e:report
```

En caso de fallo, Playwright conserva la traza, la captura de pantalla y el video configurados en `e2e/playwright.config.js`.

### Ejecucion completa

Para ejecutar primero las pruebas de API y luego las E2E:

```bash
npm run test:all
```

## Estructura principal

```text
api/
  fixtures/       Datos de prueba de API
  tests/          Pruebas Jest/SuperTest
  jest.config.js  Configuracion de Jest y reporte HTML
bdd/
  *.feature       Escenarios BDD documentados
e2e/
  fixtures/       Datos de prueba E2E
  pages/          Page Objects de Playwright
  tests/          Pruebas de flujo y permisos
  playwright.config.js
api-report/       Reporte HTML de Jest
package.json      Scripts y dependencias del proyecto
```

## Convenciones y consideraciones

- Las credenciales y URLs deben proporcionarse mediante `.env`.
- Los datos de prueba deben ser compatibles con el entorno remoto configurado.
- El flujo E2E depende de que el frontend pueda comunicarse con el backend.
- El escenario BDD es una especificacion funcional; actualmente no existe un script de Cucumber para ejecutarlo automaticamente.
- No se deben incluir `.env`, reportes ni resultados de ejecucion en commits. Estas rutas estan excluidas en `.gitignore`.

## Tecnologias

- Node.js y npm
- Jest
- SuperTest
- Playwright
- dotenv
- Gherkin para especificaciones BDD
