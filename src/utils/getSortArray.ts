import { UNDEFINED, ZERO } from '@/constants'
type OrderDirection = 'ASC' | 'DESC'

export const getSortArray = <T>({
  arr,
  property,
  direction,
}: {
  arr: T[]
  property?: keyof T
  direction: OrderDirection
}): T[] =>
  arr.slice().sort((item1, item2) => {
    const valueA = property === UNDEFINED ? item1 : item1[property]
    const valueB = property === UNDEFINED ? item1 : item2[property]

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return direction === 'ASC' ? valueA - valueB : valueB - valueA
    } else if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction === 'ASC' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }
    return ZERO
  })
