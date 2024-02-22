import { Button, Text } from '../atoms'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { type CumFindBy, type CumNameBase } from '@/types'
import { Checkbox } from '../molecules'

interface Props {
  readonly handleSearchOn: ({ fieldValue, checkedValue }: { fieldValue: CumNameBase; checkedValue: boolean }) => void
  readonly searchCums: () => Promise<void>
  readonly searchOn: Record<CumNameBase, boolean>
  readonly isFetching: boolean
  readonly setFindBy: React.Dispatch<React.SetStateAction<CumFindBy>>
  readonly setValueToSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchCum({
  handleSearchOn,
  isFetching,
  searchCums,
  searchOn,
  setFindBy,
  setValueToSearch,
}: Props): JSX.Element {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const handleOpenFilters = (): void => {
    setIsFiltersOpen((currentValue) => !currentValue)
  }

  // eslint-disable-next-line no-empty-function
  const handleSearch = (): void => {}

  const handleSelectFindBy = (event: ChangeEvent<HTMLSelectElement>): void => {
    setFindBy(event.currentTarget.value as CumFindBy)
  }

  const handleInputSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setValueToSearch(event.currentTarget.value)
  }

  const handleSearchSubmit = (event: FormEvent): void => {
    event.preventDefault()
    isFiltersOpen && setIsFiltersOpen((currentValue) => !currentValue)
    void searchCums()
  }

  return (
    <div className='p-4 bg-white shadow-lg rounded-md'>
      <form action='' className='flex flex-col gap-4' onSubmit={handleSearchSubmit}>
        <div className='flex flex-1 gap-2 items-center'>
          <label className='text-blue-900 text-xs' htmlFor='findBySelect'>
            Buscar Por:
          </label>
          <select
            className='flex-1 rounded-md p-2 border-indigo-200 border-1 text-blue-900 text-sm'
            id='findBySelect'
            name='findBy'
            onChange={handleSelectFindBy}
          >
            <option value='principioactivo'>Principio Activo</option>
            <option value='producto'>Nombre Comercial</option>
            <option value='expediente'>Expediente</option>
            <option value='atc'>ATC</option>
          </select>
        </div>
        <div className='flex flex-1 gap-2'>
          <input
            className='flex-1 text-sm rounded-md px-2 border-indigo-200 border-1 text-blue-900 '
            name='valueToSearch'
            onChange={handleInputSearch}
            type='text'
          />
          <Button
            classname={`bg-gradient-to-tl from-indigo-400 to-blue-400 text-blue-50 ${isFetching && 'cursor-wait'}`}
            disable={isFetching}
            handleClick={handleSearch}
            level='primary'
            size='md'
            type='submit'
          >
            Buscar
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          <Button classname='self-start' handleClick={handleOpenFilters} level='tertiary' size='xs' type='button'>
            {`Filtros ${isFiltersOpen ? '🔼' : '🔽'}`}
          </Button>
          {isFiltersOpen ? (
            <div className='flex flex-col gap-1'>
              <Text classname='text-xs  font-semibold'>Incluir los estados:</Text>
              <div className='flex flex-col gap-[2px]'>
                <Checkbox
                  fieldName='findOn'
                  handleChange={handleSearchOn}
                  label='Vigentes'
                  state={searchOn.vigentes}
                  value='vigentes'
                />
                <Checkbox
                  fieldName='findOn'
                  handleChange={handleSearchOn}
                  label='Tramite de renovacion'
                  state={searchOn.renovacion}
                  value='renovacion'
                />
                <Checkbox
                  fieldName='findOn'
                  handleChange={handleSearchOn}
                  label='Vencidos'
                  state={searchOn.vencidos}
                  value='vencidos'
                />
                <Checkbox
                  fieldName='findOn'
                  handleChange={handleSearchOn}
                  label='Otros estados'
                  state={searchOn.otros}
                  value='otros'
                />
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  )
}
