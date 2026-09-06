module.exports = {
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["**/tests/**/*.test.js"],
  verbose: true,
  collectCoverage: false,
  setupFilesAfterEnv: [],
  testTimeout: 30000,
  reporters: [
    "default", // Mantiene la salida en consola
    [
      "jest-html-reporters",
      {
        publicPath: "./api-report", // Carpeta donde se guarda
        filename: "report.html", // Nombre del archivo
        openReport: true, // Abre el navegador al terminar
        expand: false, // Colapsa los tests pasados
        pageTitle: "Reporte API - Proyecto Final",
      },
    ],
  ],
};
