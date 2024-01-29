import { type CumFindBy } from '@/types'

/* eslint-disable no-undefined */
export const EMPTY_ARRAY = 0
export const ZERO = 0
export const UNDEFINED = undefined
export const FIND_BY: Record<'atc' | 'expediente' | 'principioActivo' | 'productoName', CumFindBy> = {
  atc: 'atc',
  expediente: 'expediente',
  principioActivo: 'principioactivo',
  productoName: 'producto',
}
