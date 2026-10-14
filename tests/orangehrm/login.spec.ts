import { test, expect } from '@playwright/test';
import { LoginPageOrangeHRM } from '../../pages/orangehrm/login.page';

const url = process.env.ORANGEHRM_URL;
const usuario = process.env.ORANGEHRM_USER;
const clave = process.env.ORANGEHRM_PASSWORD;

if (!url || !usuario || !clave) {
  throw new Error('Faltan variables de entorno para OrangeHRM');
}

test.describe('Pruebas de Login - OrangeHRM', () => {

  test(
    'TC-DEMO-01 - Login correcto con credenciales válidas',
    {
      tag: [
        '@smoke',
        '@regression',
        '@login',
        '@positive',
      ],
    },
    async ({ page }, testInfo) => {

      const loginPage = new LoginPageOrangeHRM(page);

      await test.step('Paso 1: Abrir la página de inicio de sesión de OrangeHRM', async () => {
        await loginPage.abrirPagina(url);
      });

      await test.step('Paso 2: Ingresar credenciales válidas e iniciar sesión', async () => {
        await loginPage.iniciarSesion(
          usuario,
          clave
        );
      });

      await test.step('Paso 3: Validar el acceso correcto al Dashboard', async () => {
        await expect(page).toHaveURL(/dashboard/);

        await expect(
          page.getByRole('heading', { name: 'Dashboard' })
        ).toBeVisible();
      });

      await test.step('Paso 4: Capturar y adjuntar la evidencia del resultado exitoso', async () => {
        const rutaEvidencia = testInfo.outputPath(
          'TC-DEMO-01-login-correcto.png'
        );

        await page.screenshot({
          path: rutaEvidencia,
          fullPage: true,
        });

        await testInfo.attach(
          'TC-DEMO-01 - Login correcto',
          {
            path: rutaEvidencia,
            contentType: 'image/png',
          }
        );
      });
    }
  );


  test(
    'TC-DEMO-02 - Login rechazado con contraseña incorrecta',
    {
      tag: [
        '@regression',
        '@login',
        '@negative',
      ],
    },
    async ({ page }, testInfo) => {

      const loginPage = new LoginPageOrangeHRM(page);

      await test.step('Paso 1: Abrir la página de inicio de sesión de OrangeHRM', async () => {
        await loginPage.abrirPagina(url);
      });

      await test.step('Paso 2: Intentar el acceso con una contraseña incorrecta', async () => {
        await loginPage.iniciarSesion(
          usuario,
          'ClaveIncorrecta123'
        );
      });

      await test.step('Paso 3: Validar el rechazo de las credenciales', async () => {
        const mensajeError = page.getByText(
          'Invalid credentials',
          { exact: true }
        );

        await expect(mensajeError).toBeVisible();

        await expect(page).not.toHaveURL(/dashboard/);
      });

      await test.step('Paso 4: Capturar y adjuntar la evidencia del rechazo esperado', async () => {
        const rutaEvidencia = testInfo.outputPath(
          'TC-DEMO-02-login-rechazado.png'
        );

        await page.screenshot({
          path: rutaEvidencia,
          fullPage: true,
        });

        await testInfo.attach(
          'TC-DEMO-02 - Credenciales rechazadas',
          {
            path: rutaEvidencia,
            contentType: 'image/png',
          }
        );
      });
    }
  );

});
