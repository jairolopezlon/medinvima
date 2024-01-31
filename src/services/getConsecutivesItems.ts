import { type CumNameBase, type IConsecutiveItem } from '@/types'

export const getConsecutivesItems = async ({
  targetToSearch,
  searchParams,
}: {
  targetToSearch: CumNameBase
  searchParams: string
}): Promise<IConsecutiveItem[]> => {
  const URL_BASE = 'https://www.datos.gov.co/resource'
  const URL_TARTGETS = {
    otros: `${URL_BASE}/bsxa-tgwq.json`,
    renovacion: `${URL_BASE}/b97b-zrpe.json`,
    vencidos: `${URL_BASE}/qdqf-56cv.json`,
    vigentes: `${URL_BASE}/yraz-wrxz.json`,
  }

  const URL_API = `${URL_TARTGETS[targetToSearch.toLowerCase() as CumNameBase]}?${searchParams}`

  const response = await fetch(URL_API)
  const data = await response.json()
  return data
}
