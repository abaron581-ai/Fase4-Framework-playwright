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

    // Login.
    await loginPage.abrirPagina(url);

    await loginPage.iniciarSesion(
      usuario,
      clave
    );

    await expect(page).toHaveURL(/dashboard/);

    // Navegar a PIM.
    await pimPage.abrirPim();

    // Validar que estamos dentro del módulo PIM.
    await expect(page).toHaveURL(/pim/);

    // Validar que la vista Employee List esté disponible.
    await expect(
      page.getByText('Employee Information', { exact: true })
    ).toBeVisible();

    // Evidencia explícita de ejecución exitosa.
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
  }
);