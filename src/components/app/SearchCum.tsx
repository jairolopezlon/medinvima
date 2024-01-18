import { Button } from '../atoms'
import { type FormEvent } from 'react'

export default function SearchCum(): React.JSX.Element {
  const handleSearch = (): void => {
    // eslint-disable-next-line no-console
    console.log('search cum')
  }

  const handleSearchSubmit = (event: FormEvent): void => {
    event.preventDefault()
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
          >
            <option value='principioActivo'>Principio Activo</option>
            <option value='nombreComercial'>Nombre Comercial</option>
            <option value='expediente'>Expediente</option>
            <option value='atc'>ATC</option>
          </select>
        </div>
        <div className='flex flex-1 gap-2'>
          <input className='flex-1 text-sm rounded-md px-2 border-indigo-200 border-1 text-blue-900 ' type='text' />
          <Button
            classname='bg-gradient-to-tl from-indigo-400 to-blue-400 text-blue-50'
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
