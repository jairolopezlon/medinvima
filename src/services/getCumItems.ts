import { type CumNameBase, type IExpedienteItem } from '@/types'

export const getCumItems = async ({
  targetToSearch,
  searchParams,
}: {
  targetToSearch: CumNameBase
  searchParams: string
}): Promise<IExpedienteItem[]> => {
  const URL_BASE = 'https://www.datos.gov.co/resource'
  const URL_TARTGETS = {
    otros: `${URL_BASE}/mjdr-iq5z.json`,
    renovacion: `${URL_BASE}/ipw6-wuz4.json`,
    vencidos: `${URL_BASE}/yg66-kbaz.json`,
    vigentes: `${URL_BASE}/i8k4-nx2s.json`,
  }

  const URL_API = `${URL_TARTGETS[targetToSearch]}?${searchParams}`

  const response = await fetch(URL_API)
  const data = await response.json()
  return data
}
