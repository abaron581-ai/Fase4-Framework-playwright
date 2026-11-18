import { Locator, Page } from '@playwright/test';

export class PimPage {
  readonly menuPim: Locator;
  readonly botonAgregar: Locator;
  readonly tituloInformacionEmpleado: Locator;
  readonly campoNombre: Locator;
  readonly campoSegundoNombre: Locator;
  readonly campoApellido: Locator;
  readonly botonGuardar: Locator;
  readonly campoEmployeeId: Locator;
  readonly mensajesRequerido: Locator;
  readonly tituloDetallesPersonales: Locator;

  constructor(private readonly page: Page) {
    this.menuPim = page.getByRole('link', { name: 'PIM' });
    this.botonAgregar = page.getByRole('button', { name: 'Add' });
    this.tituloInformacionEmpleado = page.getByText('Employee Information', {
      exact: true,
    });
    this.campoNombre = page.getByPlaceholder('First Name');
    this.campoSegundoNombre = page.getByPlaceholder('Middle Name');
    this.campoApellido = page.getByPlaceholder('Last Name');
    this.botonGuardar = page.getByRole('button', { name: 'Save' });
    this.campoEmployeeId = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Id' })
      .locator('input');
    this.mensajesRequerido = page.getByText('Required', { exact: true });
    this.tituloDetallesPersonales = page.getByRole('heading', {
      name: 'Personal Details',
    });
  }

  async abrir(): Promise<void> {
    await this.menuPim.click();
    await this.page.waitForURL(/\/pim\/viewEmployeeList/);
  }

  async abrirFormularioAgregarEmpleado(): Promise<void> {
    await this.botonAgregar.click();
    await this.page.waitForURL(/\/pim\/addEmployee/);
  }

  async crearEmpleado(
    nombre: string,
    segundoNombre: string,
    apellido: string
  ): Promise<string> {
    await this.campoNombre.fill(nombre);
    await this.campoSegundoNombre.fill(segundoNombre);
    await this.campoApellido.fill(apellido);

    const employeeId = await this.campoEmployeeId.inputValue();

    await this.botonGuardar.click();
    await this.page.waitForURL(/\/pim\/viewPersonalDetails/);

    return employeeId;
  }

  async guardarFormularioVacio(): Promise<void> {
    await this.botonGuardar.click();
  }
}
