import { Locator, Page } from '@playwright/test';

export class LoginPageOrangeHRM {
  readonly campoUsuario: Locator;
  readonly campoClave: Locator;
  readonly botonLogin: Locator;
  readonly mensajeCredencialesInvalidas: Locator;
  readonly tituloDashboard: Locator;

  constructor(private readonly page: Page) {
    this.campoUsuario = page.getByRole('textbox', { name: 'Username' });
    this.campoClave = page.getByRole('textbox', { name: 'Password' });
    this.botonLogin = page.getByRole('button', { name: 'Login' });
    this.mensajeCredencialesInvalidas = page.getByText('Invalid credentials', {
      exact: true,
    });
    this.tituloDashboard = page.getByRole('heading', { name: 'Dashboard' });
  }

  async abrir(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.campoUsuario.waitFor({ state: 'visible' });
  }

  async iniciarSesion(usuario: string, clave: string): Promise<void> {
    await this.campoUsuario.fill(usuario);
    await this.campoClave.fill(clave);
    await this.botonLogin.click();
  }
}
