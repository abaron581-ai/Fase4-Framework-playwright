import { expect, test } from '@playwright/test';
import { datosOrangeHrm } from '../../data/orangehrm.data';
import { LoginPageOrangeHRM } from '../../pages/orangehrm/login.page';
import { obtenerConfiguracionOrangeHrm } from '../../utils/environment';

test.describe('Escenarios E2E de autenticación - OrangeHRM', () => {
  test(
    'TC-E2E-01 - Login correcto con credenciales válidas',
    { tag: ['@e2e', '@smoke', '@regression', '@login', '@positive'] },
    async ({ page }) => {
      const configuracion = obtenerConfiguracionOrangeHrm();
      const loginPage = new LoginPageOrangeHRM(page);

      await test.step('Abrir OrangeHRM e iniciar sesión', async () => {
        await loginPage.abrir(configuracion.url);
        await loginPage.iniciarSesion(
          configuracion.usuario,
          configuracion.clave
        );
      });

      await test.step('Validar el acceso al Dashboard', async () => {
        await expect(page).toHaveURL(/dashboard/);
        await expect(loginPage.tituloDashboard).toBeVisible();
      });
    }
  );

  test(
    'TC-E2E-02 - Login rechazado con contraseña incorrecta',
    { tag: ['@e2e', '@regression', '@login', '@negative'] },
    async ({ page }) => {
      const configuracion = obtenerConfiguracionOrangeHrm();
      const loginPage = new LoginPageOrangeHRM(page);

      await loginPage.abrir(configuracion.url);
      await loginPage.iniciarSesion(
        configuracion.usuario,
        datosOrangeHrm.claveInvalida
      );

      await expect(loginPage.mensajeCredencialesInvalidas).toBeVisible();
      await expect(page).not.toHaveURL(/dashboard/);
    }
  );
});
