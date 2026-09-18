import { Page, Locator } from '@playwright/test';

export class LoginPage {

  readonly page: Page;
  readonly campoUsuario: Locator;
  readonly campoClave: Locator;
  readonly botonLogin: Locator;
  readonly mensajeError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.campoUsuario = page.locator('#user-name');
    this.campoClave = page.locator('#password');
    this.botonLogin = page.locator('#login-button');
    this.mensajeError = page.locator('[data-test="error"]');
  }

async abrirPagina() {
  await this.page.goto(
    'https://opensource-demo.orangehrmlive.com/',
    { waitUntil: 'domcontentloaded' }
  );

  await this.campoUsuario.waitFor({ state: 'visible' });
  
}
  async iniciarSesion(usuario: string, clave: string) {
    await this.campoUsuario.fill(usuario);
    await this.campoClave.fill(clave);
    await this.botonLogin.click();
  }
}