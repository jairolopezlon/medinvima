import { type IExpedienteItem } from '@/types'

const URL_API = 'https://www.datos.gov.co/resource/i8k4-nx2s.json?$limit=10'

export const getCumVigentes = async (): Promise<IExpedienteItem[]> => {
  try {
    const response = await fetch(URL_API)
    const data = await response.json()
    return data
  } catch (error) {
    return []
  }
}
