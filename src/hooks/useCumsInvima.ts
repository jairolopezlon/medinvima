import { useEffect, useState } from 'react'
import { type ICumItem } from '@/types'
import { getCumVigentes } from '@/services/getCumVigentes'

interface returnType {
  cumsInvima: ICumItem[] | undefined
  isLoading: boolean
}

export const useCumsInvima = (): returnType => {
  const [cumsInvima, setCumsInvima] = useState<ICumItem[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getCumVigentes()
      .then((data) => {
        setCumsInvima(data)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return {
    cumsInvima,
    isLoading,
  }
}
