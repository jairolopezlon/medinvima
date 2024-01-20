import { useEffect, useState } from 'react'
import { type IExpedienteItem } from '@/types'
import { getCums } from '@/services'

interface returnType {
  cumsInvima: IExpedienteItem[] | undefined
  isLoading: boolean
}

export const useCumsInvima = (): returnType => {
  const [cumsInvima, setCumsInvima] = useState<IExpedienteItem[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getCums()
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
