import { type CumFindBy, type CumNameBase, type IExpedienteItem } from '@/types'
import { EMPTY_ARRAY } from '@/constants'
import { getCumItems } from '@/services'
import { sortArray } from '@/utils'
import { useState } from 'react'

interface PropsReturn {
  searchOn: Record<CumNameBase, boolean>
  isFetching: boolean
  hasItems: boolean
  itemsFound: IExpedienteItem[]
  setOffset: React.Dispatch<React.SetStateAction<number>>
  setValueToSearch: React.Dispatch<React.SetStateAction<string>>
  setFindBy: React.Dispatch<React.SetStateAction<CumFindBy>>
  handleSearchOn: (valueSearchOn: Record<CumNameBase, boolean>) => void
  searchCums: () => Promise<void>
}

export const useSearchCums = (): PropsReturn => {
  const DEFAULT_LIMIT = 10
  const DEFAULT_OFFSET = 0
  const DEFAULT_FIND_BY = 'principioactivo'

  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [hasItems, setHasItems] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(DEFAULT_OFFSET)
  const [findBy, setFindBy] = useState<CumFindBy>(DEFAULT_FIND_BY)
  const [valueToSearch, setValueToSearch] = useState<string>('')
  const [itemsFound, setItemsFound] = useState<IExpedienteItem[]>([])
  const [searchOn, setSearchOn] = useState<Record<CumNameBase, boolean>>({
    otros: false,
    renovacion: false,
    vencidos: false,
    vigentes: true,
  })

  const handleSearchOn = (valueSearchOn: Record<CumNameBase, boolean>): void => {
    setSearchOn((currentValue) => ({ ...currentValue, ...valueSearchOn }))
  }

  const getSearchParams = (): string => {
    const searchParams = new URLSearchParams()
    searchParams.set('$limit', DEFAULT_LIMIT.toString())
    searchParams.set('$offset', offset.toString())
    searchParams.set(`$where`, `${findBy} like '%${valueToSearch.toUpperCase()}%'`)
    return searchParams.toString()
  }

  const getRequests = (): Array<Promise<IExpedienteItem[]>> => {
    const searchParams = getSearchParams()
    const requests: Array<Promise<IExpedienteItem[]>> = []

    for (const [baseTarget, includeOnSearch] of Object.entries(searchOn)) {
      if (includeOnSearch) {
        const requestResult = getCumItems({ searchParams, targetToSearch: baseTarget as CumNameBase })
        requests.push(requestResult)
      }
    }

    return requests
  }

  const searchCums = async (): Promise<void> => {
    setIsFetching(true)

    const requests = getRequests()

    const responses = await Promise.allSettled(requests)

    const expedienteItems: IExpedienteItem[] = responses.reduce<IExpedienteItem[]>((acc, cur) => {
      const ZERO_ITEMS = 0
      if (cur.status === 'fulfilled' && cur.value.length > ZERO_ITEMS) {
        return [...acc, ...cur.value]
      }
      return acc
    }, [])

    const expedienteItemsSorted = sortArray<IExpedienteItem>({
      arr: expedienteItems,
      direction: 'ASC',
      property: 'producto',
    })

    setItemsFound(() => expedienteItemsSorted)
    setHasItems(expedienteItemsSorted.length > EMPTY_ARRAY)
    setIsFetching(false)
  }

  return {
    handleSearchOn,
    hasItems,
    isFetching,
    itemsFound,
    searchCums,
    searchOn,
    setFindBy,
    setOffset,
    setValueToSearch,
  }
}