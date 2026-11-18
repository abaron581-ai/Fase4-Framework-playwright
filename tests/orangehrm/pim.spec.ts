import { expect, test } from '@playwright/test';
import {
  apellidoEmpleadoUnico,
  datosOrangeHrm,
} from '../../data/orangehrm.data';
import { LoginPageOrangeHRM } from '../../pages/orangehrm/login.page';
import { PimPage } from '../../pages/orangehrm/pim.page';
import { obtenerConfiguracionOrangeHrm } from '../../utils/environment';

async function iniciarSesion(page: import('@playwright/test').Page): Promise<void> {
  const configuracion = obtenerConfiguracionOrangeHrm();
  const loginPage = new LoginPageOrangeHRM(page);

  await loginPage.abrir(configuracion.url);
  await loginPage.iniciarSesion(configuracion.usuario, configuracion.clave);
  await expect(page).toHaveURL(/dashboard/);
}

test.describe('Escenarios E2E del módulo PIM - OrangeHRM', () => {
  test(
    'TC-E2E-03 - Acceso al módulo PIM y Employee List',
    { tag: ['@e2e', '@smoke', '@regression', '@pim', '@positive'] },
    async ({ page }) => {
      const pimPage = new PimPage(page);

      await iniciarSesion(page);
      await pimPage.abrir();

      await expect(page).toHaveURL(/\/pim\/viewEmployeeList/);
      await expect(pimPage.tituloInformacionEmpleado).toBeVisible();
    }
  );

  test(
    'TC-E2E-04 - Creación de un empleado con datos válidos',
    { tag: ['@e2e', '@regression', '@pim', '@positive'] },
    async ({ page }) => {
      const pimPage = new PimPage(page);

      await iniciarSesion(page);
      await pimPage.abrir();
      await pimPage.abrirFormularioAgregarEmpleado();

      const employeeId = await pimPage.crearEmpleado(
        datosOrangeHrm.empleado.nombre,
        datosOrangeHrm.empleado.segundoNombre,
        apellidoEmpleadoUnico()
      );

      expect(employeeId.trim()).not.toBe('');
      await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\//);
      await expect(pimPage.tituloDetallesPersonales).toBeVisible();
    }
  );

  test(
    'TC-E2E-05 - Validación de campos obligatorios al crear empleado',
    { tag: ['@e2e', '@regression', '@pim', '@negative'] },
    async ({ page }) => {
      const pimPage = new PimPage(page);

      await iniciarSesion(page);
      await pimPage.abrir();
      await pimPage.abrirFormularioAgregarEmpleado();
      await pimPage.guardarFormularioVacio();

      await expect(pimPage.mensajesRequerido).toHaveCount(2);
      await expect(page).toHaveURL(/\/pim\/addEmployee/);
    }
  );
});
