import { type ICumItem } from '@/types'
import { cumVigentes } from '@/mocks/cumVigentes'

export const getCumVigentes = async (): Promise<ICumItem[]> => await Promise.resolve(cumVigentes)
