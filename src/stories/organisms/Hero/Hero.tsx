import { Text } from '@/components/atoms'

export default function Hero(): JSX.Element {
  return (
    <div className='flex items-center justify-center bg-indigo-50/40'>
      <div className='min-h-screen flex flex-col justify-center  p-4 items-start max-w-6xl gap-4 max-md:gap-2'>
        <Text classname='text-6xl leading-none font-bold text-indigo-600 drop-shadow-md lg:text-7xl max-sm:text-4xl '>
          Simplificando la Consulta de Registros Sanitarios de Medicamentos
        </Text>
        <Text classname='text-4xl font-medium text-indigo-950 lg:text-5xl max-sm:text-xl  drop-shadow-md '>
          Valida en pocos pasos el estado de los medicamentos
        </Text>
        <a
          className=' mt-8 py-3 px-6 self-end text-center bg-indigo-500 rounded-md text-lg hover:bg-indigo-800 max-sm:text-sm'
          href='/app'
        >
          Ingresa y realiza tus consultas
        </a>
      </div>
    </div>
  )
}
