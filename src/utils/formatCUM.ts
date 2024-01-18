export const formatCUM = ({
  expediente,
  consecutivo,
  atc,
}: {
  expediente: string
  consecutivo: string
  atc: string
}) => {
  const expedienteFormat = expediente.padStart(8, '0')
  const consecutivoFormat = consecutivo.padStart(2, '0')
  const atcFormat = `0${atc}`

  return `${expedienteFormat}-${consecutivoFormat}-${atcFormat}`
}
