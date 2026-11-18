# Framework de automatización E2E con Playwright

Prototipo académico para automatizar pruebas end-to-end de OrangeHRM mediante Playwright, TypeScript y Page Object Model (POM).

## Estructura

```text
data/                    Datos de prueba no sensibles
pages/orangehrm/         Page Objects de Login y PIM
tests/orangehrm/         Escenarios E2E
utils/                   Validación de variables de entorno
playwright.config.ts     Configuración de ejecución y evidencias
azure-pipelines.yml      Integración con Azure Pipelines
```

## Escenarios automatizados

| ID | Escenario | Suite |
|---|---|---|
| TC-E2E-01 | Login correcto con credenciales válidas | smoke, regression |
| TC-E2E-02 | Rechazo de contraseña incorrecta | regression |
| TC-E2E-03 | Acceso al módulo PIM y Employee List | smoke, regression |
| TC-E2E-04 | Creación de un empleado con datos válidos | regression |
| TC-E2E-05 | Validación de campos obligatorios al crear un empleado | regression |

## Requisitos

- Node.js 20 o superior.
- npm.
- Google Chrome.
- Acceso al ambiente de demostración de OrangeHRM.

## Instalación

Clone el repositorio, abra una terminal en su carpeta e instale las dependencias:

```powershell
npm.cmd ci
```

## Variables de entorno

Las credenciales no se almacenan en el repositorio. Defínalas en la terminal de PowerShell que utilizará para ejecutar las pruebas:

```powershell
$env:ORANGEHRM_URL = Read-Host "URL de OrangeHRM"
$env:ORANGEHRM_USER = Read-Host "Usuario"
$claveSegura = Read-Host "Contraseña" -AsSecureString
$env:ORANGEHRM_PASSWORD = [System.Net.NetworkCredential]::new('', $claveSegura).Password
```

También puede tomar `.env.example` como referencia para conocer los nombres requeridos. No confirme archivos `.env` ni credenciales reales en Git.

## Ejecución

Ejecutar los cinco escenarios:

```powershell
npm.cmd test
```

Ejecutarlos mostrando el navegador:

```powershell
npm.cmd run test:headed
```

Ejecutar por suite o módulo:

```powershell
npm.cmd run test:smoke
npm.cmd run test:regression
npm.cmd run test:login
npm.cmd run test:pim
```

Ejecutar un escenario específico:

```powershell
npx.cmd playwright test --grep "TC-E2E-01" --headed --workers=1
```

Listar los escenarios sin ejecutarlos:

```powershell
npm.cmd run test:list
```

## Evidencias

La ejecución genera:

- reporte HTML en `playwright-report/`;
- resultado JSON en `test-results/results.json`;
- resultado JUnit en `test-results/junit.xml`;
- screenshots y trazas en `test-results/`.

Para abrir el último reporte HTML:

```powershell
npm.cmd run report
```

Los resultados y evidencias son archivos temporales y están excluidos de Git.

## Azure Pipelines

El pipeline permite seleccionar:

- suite `smoke` o `regression`;
- módulo `todos`, `login` o `pim`.

En Azure DevOps deben configurarse las siguientes variables; el usuario y la contraseña deben marcarse como secretas:

- `ORANGEHRM_URL`;
- `ORANGEHRM_USER`;
- `ORANGEHRM_PASSWORD`.

La ejecución predeterminada corresponde a la regresión completa. Al finalizar, Azure publica los resultados JUnit, el reporte HTML, los screenshots y las trazas.

## Seguridad

- No incluya credenciales en el código, commits, reportes ni capturas.
- No publique archivos `.env`, `node_modules/`, `test-results/` o `playwright-report/`.
- Utilice exclusivamente ambientes y datos autorizados para pruebas.

Al terminar la sesión local puede eliminar las variables con:

```powershell
Remove-Item Env:ORANGEHRM_URL
Remove-Item Env:ORANGEHRM_USER
Remove-Item Env:ORANGEHRM_PASSWORD
Remove-Variable claveSegura
```
