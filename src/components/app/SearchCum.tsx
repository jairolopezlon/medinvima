import { type ChangeEvent, type FormEvent } from 'react'
import { type CumFindBy, type CumNameBase } from '@/types'
import { Button } from '../atoms'

interface Props {
  readonly handleSearchOn: (valueSearchOn: Record<CumNameBase, boolean>) => void
  readonly searchCums: () => Promise<void>
  readonly isFetching: boolean
  readonly setFindBy: React.Dispatch<React.SetStateAction<CumFindBy>>
  readonly setValueToSearch: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchCum({
  searchCums,
  handleSearchOn,
  isFetching,
  setValueToSearch,
  setFindBy,
}: Props): React.JSX.Element {
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
      </form>
    </div>
  )
}
