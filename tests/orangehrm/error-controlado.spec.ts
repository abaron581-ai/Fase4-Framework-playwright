import { test, expect } from '@playwright/test';

import { LoginPageOrangeHRM } from '../../pages/orangehrm/login.page';

const url = process.env.ORANGEHRM_URL;
const usuario = process.env.ORANGEHRM_USER;
const clave = process.env.ORANGEHRM_PASSWORD;

if (!url || !usuario || !clave) {
  throw new Error('Faltan variables de entorno para OrangeHRM');
}

test(
  'Demo - Error controlado después del login',
  {
    tag: ['@demo-error'],
  },
  async ({ page }) => {

    const loginPage = new LoginPageOrangeHRM(page);

    await test.step('Paso 1: Abrir OrangeHRM e iniciar sesión correctamente', async () => {
      await loginPage.abrirPagina(url);

      await loginPage.iniciarSesion(
        usuario,
        clave
      );
    });

    await test.step('Paso 2: Confirmar que la precondición del Dashboard se cumple', async () => {
      await expect(page).toHaveURL(/dashboard/);
    });

    await test.step('Paso 3: Provocar un error intencional para demostrar diagnóstico y evidencias', async () => {
      await expect(page).toHaveURL(/pagina-que-no-existe/);
    });
  }
);
