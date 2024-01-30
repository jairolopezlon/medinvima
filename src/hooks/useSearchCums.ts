import { type CumFindBy, type CumNameBase, type IConsecutiveItem, type IExpedienteItem } from '@/types'
import { EMPTY_ARRAY, FIND_BY, UNDEFINED } from '@/constants'
import { getConsecutivesItems, getCumItems } from '@/services'
import { getSortArray } from '@/utils'
import { useState } from 'react'

export interface ISearchConsecutivesProps {
  expediente: string
  expedienteStatus: CumNameBase
}
interface IHandleSearchOnProps {
  fieldValue: CumNameBase
  checkedValue: boolean
}
interface PropsReturn {
  searchOn: Record<CumNameBase, boolean>
  isFetching: boolean
  isFirstFetching: boolean
  hasItems: boolean
  itemsFound: IExpedienteItem[]
  isFetchingConsecutives: boolean
  consecutivesData: Record<string, IConsecutiveItem[]>
  searchConsecutives: ({ expediente, expedienteStatus }: ISearchConsecutivesProps) => Promise<void>
  setOffset: React.Dispatch<React.SetStateAction<number>>
  setValueToSearch: React.Dispatch<React.SetStateAction<string>>
  setFindBy: React.Dispatch<React.SetStateAction<CumFindBy>>
  handleSearchOn: ({ fieldValue, checkedValue }: IHandleSearchOnProps) => void
  searchCums: () => Promise<void>
}

export const useSearchCums = (): PropsReturn => {
  const DEFAULT_LIMIT = 10
  const DEFAULT_OFFSET = 0
  const DEFAULT_FIND_BY = FIND_BY.principioActivo

  const [consecutivesData, setConsecutivesData] = useState<Record<string, IConsecutiveItem[]>>({})
  const [isFetchingConsecutives, setIsFetchingConsecutives] = useState<boolean>(false)
  const [isFirstFetching, setIsFirstFetching] = useState<boolean>(true)
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

  const handleSearchOn = ({ fieldValue, checkedValue }: IHandleSearchOnProps): void => {
    setSearchOn((currentValue) => ({ ...currentValue, ...{ [fieldValue]: checkedValue } }))
  }

  const getWhereFormat = (): string => {
    if (findBy === FIND_BY.expediente) {
      return `${findBy}=${valueToSearch}`
    }
    return `${findBy} like '%${valueToSearch.toUpperCase().trim()}%'`
  }

  const getSearchParams = (): string => {
    const searchParams = new URLSearchParams()
    searchParams.set('$limit', DEFAULT_LIMIT.toString())
    searchParams.set('$offset', offset.toString())
    searchParams.set(`$where`, getWhereFormat())
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

  const searchConsecutives = async ({ expediente, expedienteStatus }: ISearchConsecutivesProps): Promise<void> => {
    if (consecutivesData[expediente] === UNDEFINED) {
      setIsFetchingConsecutives(true)

      const searchParams = new URLSearchParams()
      searchParams.set('$where', `expediente=${expediente}`)

      const requestResult = await getConsecutivesItems({
        searchParams: searchParams.toString(),
        targetToSearch: expedienteStatus,
      })

      setConsecutivesData((currentData) => ({ ...currentData, [expediente]: requestResult }))
      setIsFetchingConsecutives(false)
    }
  }

  const searchCums = async (): Promise<void> => {
    setIsFirstFetching(false)
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

    const expedienteItemsSorted = getSortArray<IExpedienteItem>({
      arr: expedienteItems,
      direction: 'ASC',
      property: FIND_BY.productoName,
    })

    setItemsFound(() => expedienteItemsSorted)
    setHasItems(expedienteItemsSorted.length > EMPTY_ARRAY)
    setIsFetching(false)
  }

  return {
    consecutivesData,
    handleSearchOn,
    hasItems,
    isFetching,
    isFetchingConsecutives,
    isFirstFetching,
    itemsFound,
    searchConsecutives,
    searchCums,
    searchOn,
    setFindBy,
    setOffset,
    setValueToSearch,
  }
}
