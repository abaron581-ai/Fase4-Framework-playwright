import { Page, Locator } from '@playwright/test';


export class PimPage {

  readonly page: Page;
  readonly menuPim: Locator;
  readonly botonAdd: Locator;
  readonly campoNombre: Locator;
  readonly campoSegundoNombre: Locator;
  readonly campoApellido: Locator;
  readonly botonGuardar: Locator;
  readonly campoEmployeeId: Locator;

  

  constructor(page: Page) {
    this.page = page;

    this.menuPim = page.getByRole('link', { name: 'PIM' });
    this.botonAdd = page.getByRole('button', { name: 'Add' });
    this.campoNombre = page.getByRole('textbox', { name: 'First Name' });
    this.campoSegundoNombre = page.getByRole('textbox', { name: 'Middle Name' });
    this.campoApellido = page.getByRole('textbox', { name: 'Last Name' });
    this.botonGuardar = page.getByRole('button', { name: 'Save' });
    this.campoEmployeeId = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Id' })
      .locator('input');

  }

  async abrirPim() {
    await this.menuPim.click();
  }

  async abrirAgregarEmpleado() {
    await this.botonAdd.click();
  }
  
  async crearEmpleado(
  nombre: string,
  segundoNombre: string,
  apellido: string
) {
  await this.campoNombre.fill(nombre);
  await this.campoSegundoNombre.fill(segundoNombre);
  await this.campoApellido.fill(apellido);

  const employeeId = await this.campoEmployeeId.inputValue();

  await this.botonGuardar.click();

  return employeeId;
}

}