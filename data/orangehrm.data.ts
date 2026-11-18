export const datosOrangeHrm = {
  claveInvalida: 'ClaveIncorrecta123!',
  empleado: {
    nombre: 'Piloto',
    segundoNombre: 'QA',
    apellidoBase: 'Automatizacion',
  },
} as const;

export function apellidoEmpleadoUnico(): string {
  return `${datosOrangeHrm.empleado.apellidoBase}${Date.now()}`;
}
