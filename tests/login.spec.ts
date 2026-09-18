import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Login correcto', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.abrirPagina();

  await loginPage.iniciarSesion('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);

});

test('Login incorrecto', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.abrirPagina();

  await loginPage.iniciarSesion('usuario_incorrecto', 'clave_incorrecta');

  await expect(loginPage.mensajeError).toBeVisible();

});