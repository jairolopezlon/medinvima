'use client'
import { CardInitialSearchItems, CardItemsNotFound, SkeletonCardSearchingItems } from '@components/molecules'
import { CumItemCard, SearchCum } from '@/components/app'
import { useSearchCums } from '@/hooks'

export default function HomeApp(): React.JSX.Element {
  const {
    handleSearchOn,
    hasItems,
    isFetching,
    isFirstFetching,
    searchCums,
    searchOn,
    setFindBy,
    setValueToSearch,
    itemsFound,
  } = useSearchCums()

  return (
    <div className='flex flex-col gap-2'>
      <SearchCum
        handleSearchOn={handleSearchOn}
        isFetching={isFetching}
        searchCums={searchCums}
        searchOn={searchOn}
        setFindBy={setFindBy}
        setValueToSearch={setValueToSearch}
      />
      <div className='bg-white p-4 flex flex-col gap-1 rounded-md'>
        {isFirstFetching && !isFetching ? <CardInitialSearchItems /> : null}
        {isFetching ? <SkeletonCardSearchingItems /> : null}

        {!isFetching && hasItems
          ? itemsFound?.map((item) => (
              <CumItemCard cumData={item} key={`${item.expediente}-${item.principioactivo.replaceAll(' ', '-')}`} />
            ))
          : null}

        {!isFetching && !hasItems && !isFirstFetching ? <CardItemsNotFound /> : null}
      </div>
    </div>
  )
}
