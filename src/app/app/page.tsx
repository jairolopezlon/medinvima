'use client'
import CumItemCard from '@/components/app/CumItemCard'
import { SearchCum } from '@components/app'
import { useSearchCums } from '@/hooks'

export default function HomeApp(): React.JSX.Element {
  const { handleSearchOn, hasItems, isFetching, searchCums, setFindBy, setValueToSearch, itemsFound } = useSearchCums()
  return (
    <div className='flex flex-col gap-2'>
      <SearchCum
        handleSearchOn={handleSearchOn}
        isFetching={isFetching}
        searchCums={searchCums}
        setFindBy={setFindBy}
        setValueToSearch={setValueToSearch}
      />
      <div className='bg-white p-4 flex flex-col gap-1'>
        {isFetching ? (
          <div>
            <h4 className='text-gray-600'>Cargando...</h4>
          </div>
        ) : null}

        {!isFetching && hasItems
          ? itemsFound?.map((item) => (
              <CumItemCard cumData={item} key={`${item.expediente}-${item.principioactivo.replaceAll(' ', '-')}`} />
            ))
          : null}

        {!isFetching && !hasItems ? (
          <div>
            <h4 className='text-gray-600'>Sin resultados</h4>
          </div>
        ) : null}
      </div>
    </div>
  )
}
