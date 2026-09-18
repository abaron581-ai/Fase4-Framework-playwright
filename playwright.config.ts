import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Ejecuta pruebas de distintos archivos en paralelo
  fullyParallel: true,

  // En CI evita dejar test.only por error
  forbidOnly: !!process.env.CI,

  // En CI reintenta pruebas fallidas hasta 2 veces
  retries: process.env.CI ? 2 : 0,

  // En CI usa un solo worker
  workers: process.env.CI ? 1 : undefined,

  // Genera reporte HTML
  // Genera reporte HTML y resultado JUnit para Azure
  reporter: [
  ['html'],
  ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  // Configuración general para todas las pruebas
  use: {
    // Guarda captura de pantalla cuando una prueba falla
    screenshot: 'only-on-failure',

    // Conserva la traza completa cuando una prueba falla
    trace: 'retain-on-failure',
  },

  // Navegador utilizado en el proyecto
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],

        // Usa el Google Chrome instalado localmente
        channel: 'chrome',
      },
    },
  ],
});