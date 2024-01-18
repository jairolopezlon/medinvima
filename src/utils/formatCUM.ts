export const formatCUM = ({
  expediente,
  consecutivo,
  atc,
}: {
  expediente: string
  consecutivo: string
  atc: string
}): string => {
  const EXPEDIENTE_LENGHT = 8
  const CONSECUTIVO_LENGHT = 2

  const expedienteFormat = expediente.padStart(EXPEDIENTE_LENGHT, '0')
  const consecutivoFormat = consecutivo.padStart(CONSECUTIVO_LENGHT, '0')
  const atcFormat = `0${atc}`

  return `${expedienteFormat}-${consecutivoFormat}-${atcFormat}`
}
