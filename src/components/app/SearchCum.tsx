export default function SearchCum(): React.JSX.Element {
  return (
    <div className='p-4 bg-white shadow-lg rounded-md'>
      <form action='' className='flex flex-col gap-4'>
        <div className='flex flex-1 gap-2 items-center'>
          <label className='text-blue-900 text-xs' htmlFor='findBySelect'>
            Buscar Por:
          </label>
          <select
            className='flex-1 rounded-md p-2 border-indigo-200 border-1 text-blue-900 text-sm'
            id='findBySelect'
            name='findBy'
          >
            <option value=''>Principio Activo</option>
            <option value=''>Nombre Comercial</option>
            <option value=''>Expediente</option>
            <option value=''>ATC</option>
          </select>
        </div>
        <div className='flex flex-1 gap-2'>
          <input className='flex-1 text-sm rounded-md px-2 border-indigo-200 border-1 text-blue-900 ' type='text' />
          <button
            className='px-4 py-2 bg-gradient-to-tl from-indigo-400 to-blue-400 text-blue-50 rounded-md'
            type='submit'
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  )
}
