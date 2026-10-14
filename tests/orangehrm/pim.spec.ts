import { test, expect } from '@playwright/test';

import { LoginPageOrangeHRM } from '../../pages/orangehrm/login.page';
import { PimPage } from '../../pages/orangehrm/pim.page';

const url = process.env.ORANGEHRM_URL;
const usuario = process.env.ORANGEHRM_USER;
const clave = process.env.ORANGEHRM_PASSWORD;

if (!url || !usuario || !clave) {
  throw new Error('Faltan variables de entorno para OrangeHRM');
}

test(
  'TC-DEMO-03 - Acceso al módulo PIM y Employee List',
  {
    tag: [
      '@regression',
      '@pim',
      '@positive',
    ],
  },
  async ({ page }, testInfo) => {

    const loginPage = new LoginPageOrangeHRM(page);
    const pimPage = new PimPage(page);

    await test.step('Paso 1: Abrir OrangeHRM e iniciar sesión', async () => {
      await loginPage.abrirPagina(url);

      await loginPage.iniciarSesion(
        usuario,
        clave
      );

      await expect(page).toHaveURL(/dashboard/);
    });

    await test.step('Paso 2: Navegar desde el Dashboard al módulo PIM', async () => {
      await pimPage.abrirPim();
    });

    await test.step('Paso 3: Validar el acceso a Employee List', async () => {
      await expect(page).toHaveURL(/pim/);

      await expect(
        page.getByText('Employee Information', { exact: true })
      ).toBeVisible();
    });

    await test.step('Paso 4: Capturar y adjuntar la evidencia del módulo PIM', async () => {
      const rutaEvidencia = testInfo.outputPath(
        'TC-DEMO-03-pim-employee-list.png'
      );

      await page.screenshot({
        path: rutaEvidencia,
        fullPage: true,
      });

      await testInfo.attach(
        'TC-DEMO-03 - Employee List',
        {
          path: rutaEvidencia,
          contentType: 'image/png',
        }
      );
    });
  }
);
