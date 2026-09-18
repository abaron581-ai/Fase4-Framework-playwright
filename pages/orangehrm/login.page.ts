import { Page, Locator } from '@playwright/test';

export class LoginPageOrangeHRM {

  readonly page: Page;
  readonly campoUsuario: Locator;
  readonly campoClave: Locator;
  readonly botonLogin: Locator;

  constructor(page: Page) {
    this.page = page;

    this.campoUsuario = page.getByRole('textbox', { name: 'Username' });
    this.campoClave = page.getByRole('textbox', { name: 'Password' });
    this.botonLogin = page.getByRole('button', { name: 'Login' });
  }

  async abrirPagina() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/');
  }

  async iniciarSesion(usuario: string, clave: string) {
    await this.campoUsuario.fill(usuario);
    await this.campoClave.fill(clave);
    await this.botonLogin.click();
  }

}