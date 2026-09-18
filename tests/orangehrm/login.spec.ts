import { test, expect } from '@playwright/test';
import { LoginPageOrangeHRM } from '../../pages/orangehrm/login.page';

test('Login correcto en OrangeHRM', async ({ page }) => {

  const loginPage = new LoginPageOrangeHRM(page);

  await loginPage.abrirPagina();

  await loginPage.iniciarSesion(
    'Admin',
    'admin123'
  );

  await expect(page).toHaveURL(/dashboard/);

});