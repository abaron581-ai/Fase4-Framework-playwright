import { test, expect } from '@playwright/test';
import { LoginPageOrangeHRM } from '../../pages/orangehrm/login.page';
import { PimPage } from '../../pages/orangehrm/pim.page';

test('Crear empleado en OrangeHRM', async ({ page }) => {

  const loginPage = new LoginPageOrangeHRM(page);
  const pimPage = new PimPage(page);

  await loginPage.abrirPagina();

  await loginPage.iniciarSesion(
    'Admin',
    'admin123'
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