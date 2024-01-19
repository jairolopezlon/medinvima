import { getCumVencidos, getCumVigentes } from '@/services'
import { type IExpedienteItem } from '@/types'

export const getCums = async (): Promise<IExpedienteItem[]> => {
  const cumVigentesData = getCumVigentes()
  const cumVencidosData = getCumVencidos()

  const cumData = await Promise.allSettled([cumVigentesData, cumVencidosData])

  const expedienteItems: IExpedienteItem[] = cumData.reduce<IExpedienteItem[]>((acc, cur) => {
    const ZERO_ITEMS = 0

    if (cur.status === 'rejected') return acc
    if (cur.status === 'fulfilled' && cur.value.length === ZERO_ITEMS) return acc
    if (cur.status === 'fulfilled' && cur.value.length > ZERO_ITEMS) return [...acc, ...cur.value]
    return acc
  }, [])

  const MENOR = -1
  const IGUAL = 0
  const MAYOR = 1

  return expedienteItems.sort((item1, item2) => {
    const productoA = item1.producto.toLowerCase()
    const productoB = item2.producto.toLowerCase()

    if (productoA < productoB) {
      return MENOR
    } else if (productoA > productoB) {
      return MAYOR
    }
    return IGUAL
  })
}
