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

    await loginPage.abrirPagina(url);

    await loginPage.iniciarSesion(
      usuario,
      clave
    );

    // Validamos primero que el login sí funcionó
    await expect(page).toHaveURL(/dashboard/);

    // ERROR INTENCIONAL PARA DEMOSTRACIÓN
    await expect(page).toHaveURL(/pagina-que-no-existe/);
  }
);