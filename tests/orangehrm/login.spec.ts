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

      // Abrir OrangeHRM.
      await loginPage.abrirPagina(url);

      // Iniciar sesión con credenciales válidas.
      await loginPage.iniciarSesion(
        usuario,
        clave
      );

      // Validar que el usuario llegue al Dashboard.
      await expect(page).toHaveURL(/dashboard/);

      await expect(
        page.getByRole('heading', { name: 'Dashboard' })
      ).toBeVisible();

      // Evidencia explícita de una prueba exitosa.
      const evidencia = await page.screenshot({
        fullPage: true,
      });

      await testInfo.attach(
        'TC-DEMO-01 - Dashboard después del login',
        {
          body: evidencia,
          contentType: 'image/png',
        }
      );
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

      // Abrir OrangeHRM.
      await loginPage.abrirPagina(url);

      // Intentar iniciar sesión con una contraseña inválida.
      await loginPage.iniciarSesion(
        usuario,
        'ClaveIncorrecta123'
      );

      // El comportamiento correcto es rechazar el acceso.
      const mensajeError = page.getByText(
        'Invalid credentials',
        { exact: true }
      );

      await expect(mensajeError).toBeVisible();

      // También verificamos que no haya entrado al Dashboard.
      await expect(page).not.toHaveURL(/dashboard/);

      // Evidencia explícita del comportamiento negativo esperado.
      const evidencia = await page.screenshot({
        fullPage: true,
      });

      await testInfo.attach(
        'TC-DEMO-02 - Credenciales rechazadas correctamente',
        {
          body: evidencia,
          contentType: 'image/png',
        }
      );
    }
  );

});