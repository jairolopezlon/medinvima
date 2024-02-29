'use client'
import { CardInitialSearchItems, CardItemsNotFound, SkeletonCardSearchingItems } from '@components/molecules'
import { CumItemCard, SearchCum } from '@/components/app'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchCums } from '@/hooks'
import { useSessionContext } from '@/contexts/Session'

export default function HomeApp(): React.JSX.Element {
  const { isAuthenticated } = useSessionContext()
  const router = useRouter()
  const {
    handleSearchOn,
    hasItems,
    isFetching,
    isFirstFetching,
    itemsFound,
    searchConsecutives,
    searchCums,
    searchOn,
    setFindBy,
    setValueToSearch,
    consecutivesData,
    isFetchingConsecutives,
  } = useSearchCums()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/app/ingreso')
    }
  })

  return (
    <div className='flex flex-col gap-2'>
      {isAuthenticated ? (
        <>
          <SearchCum
            handleSearchOn={handleSearchOn}
            isFetching={isFetching}
            searchCums={searchCums}
            searchOn={searchOn}
            setFindBy={setFindBy}
            setValueToSearch={setValueToSearch}
          />
          <div className='bg-white p-4 flex flex-col gap-1 rounded-md min-w-min'>
            {isFirstFetching && !isFetching ? <CardInitialSearchItems /> : null}
            {isFetching ? <SkeletonCardSearchingItems /> : null}

            {!isFetching && hasItems
              ? itemsFound?.map((item) => (
                  <CumItemCard
                    consecutivesData={consecutivesData[item.expediente]}
                    cumData={item}
                    isFetchingConsecutives={isFetchingConsecutives}
                    key={`${item.expediente}-${item.principioactivo.replaceAll(' ', '-')}`}
                    searchConsecutives={searchConsecutives}
                  />
                ))
              : null}
            {!isFetching && !hasItems && !isFirstFetching ? <CardItemsNotFound /> : null}
          </div>
        </>
      ) : null}
    </div>
  )
}
