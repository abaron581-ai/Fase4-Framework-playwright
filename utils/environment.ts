export interface OrangeHrmConfig {
  url: string;
  usuario: string;
  clave: string;
}

function variableRequerida(nombre: string): string {
  const valor = process.env[nombre]?.trim();

  if (!valor) {
    throw new Error(
      `Falta la variable de entorno ${nombre}. ` +
      'Configure las variables del sistema, Azure Pipelines o un archivo .env local.'
    );
  }

  return valor;
}

export function obtenerConfiguracionOrangeHrm(): OrangeHrmConfig {
  return {
    url: variableRequerida('ORANGEHRM_URL'),
    usuario: variableRequerida('ORANGEHRM_USER'),
    clave: variableRequerida('ORANGEHRM_PASSWORD'),
  };
}
