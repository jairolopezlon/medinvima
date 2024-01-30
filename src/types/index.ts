export interface ICumItem {
  atc: string
  cantidad: string
  cantidadcum: string
  concentracion: string
  consecutivocum: string
  descripcionatc: string
  descripcioncomercial: string
  estadocum: string
  estadoregistro: string
  expediente: string
  expedientecum: string
  fechaactivo: string
  fechaexpedicion: string
  fechainactivo?: string
  formafarmaceutica: string
  modalidad: string
  muestramedica: string
  nombrerol: string
  principioactivo: string
  producto: string
  registrosanitario: string
  tiporol: string
  titular: string
  unidad: string
  unidadmedida: string
  unidadreferencia: string
  viaadministracion: string
}

export interface IExpedienteItem {
  atc: string
  cantidad: string
  descripcionatc: string
  estadoregistro: string
  expediente: string
  fechaexpedicion: string
  fechavencimiento?: string
  formafarmaceutica: string
  principioactivo: string
  producto: string
  registrosanitario: string
  titular: string
  unidadmedida: string
  unidadreferencia: string
  viaadministracion: string
}

export interface IConsecutiveItem {
  cantidadcum: string
  consecutivocum: string
  descripcioncomercial: string
  estadocum: 'Inactivo' | 'Activo'
  expediente: string
  fechaactivo: string
  fechainactivo: string
  muestramedica: 'No' | 'Si'
  unidad: string
}

export type CumFindBy = 'producto' | 'expediente' | 'principioactivo' | 'atc'

export type CumNameBase = 'vigentes' | 'vencidos' | 'renovacion' | 'otros'
