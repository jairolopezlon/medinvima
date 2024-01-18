'use client'
import CumItemCard from '@/components/app/CumItemCard'
import { SearchCum } from '@components/app'
import { useCumsInvima } from '@/hooks/useCumsInvima'

export default function HomeApp(): React.JSX.Element {
  const { cumsInvima, isLoading } = useCumsInvima()
  return (
    <div className='flex flex-col gap-2'>
      <SearchCum />
      <div className='bg-white p-4 flex flex-col gap-1'>
        {isLoading ? (
          <div>
            <h4 className='text-gray-600'>cargando...</h4>
          </div>
        ) : (
          cumsInvima?.map((item) => <CumItemCard cumData={item} key={`${item.expedientecum}-${item.consecutivocum}`} />)
        )}
      </div>
    </div>
  )
}
