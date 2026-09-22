import { test, expect } from '@playwright/test';

import { LoginPageOrangeHRM } from '../../pages/orangehrm/login.page';

// Variables de entorno
const url = process.env.ORANGEHRM_URL;
const usuario = process.env.ORANGEHRM_USER;
const clave = process.env.ORANGEHRM_PASSWORD;

// Validación de configuración
if (!url || !usuario || !clave) {
  throw new Error('Faltan variables de entorno para OrangeHRM');
}

test(
  'Login correcto en OrangeHRM',
  {
    tag: ['@smoke', '@regression', '@login'],
  },
  async ({ page }) => {

  const loginPage = new LoginPageOrangeHRM(page);

  await loginPage.abrirPagina(url);

  await loginPage.iniciarSesion(
    usuario,
    clave
  );

  await expect(page).toHaveURL(/dashboard/);

});