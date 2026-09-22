import { test, expect } from '@playwright/test';

import { LoginPageOrangeHRM } from '../../pages/orangehrm/login.page';

import { PimPage } from '../../pages/orangehrm/pim.page';

// Variables de entorno
const url = process.env.ORANGEHRM_URL;
const usuario = process.env.ORANGEHRM_USER;
const clave = process.env.ORANGEHRM_PASSWORD;

// Validación de configuración
if (!url || !usuario || !clave) {
  throw new Error('Faltan variables de entorno para OrangeHRM');
}

test('Crear empleado en OrangeHRM', async ({ page }) => {

  const loginPage = new LoginPageOrangeHRM(page);

  const pimPage = new PimPage(page);

  await loginPage.abrirPagina(url);

  await loginPage.iniciarSesion(
    usuario,
    clave
  );

  await pimPage.abrirPim();

  await pimPage.abrirAgregarEmpleado();

  const employeeId = await pimPage.crearEmpleado(
    'Piloto',
    'QA',
    'Automatizacion'
  );

  console.log('Employee Id generado:', employeeId);

  await expect(page).toHaveURL(/viewPersonalDetails/);

});