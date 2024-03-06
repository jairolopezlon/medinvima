import { Text } from '@/components/atoms'

interface Props {
  readonly customClass?: string
}

export default function HomeNextFeatures({ customClass }: Props): JSX.Element {
  return (
    <div className='flex items-center justify-center bg-indigo-100/10'>
      <div className='flex flex-col p-4 items-center justify-center max-w-6xl gap-8 my-20'>
        <Text classname='text-indigo-500 font-semibold text-3xl max-md:text-xl text-center drop-shadow-md'>
          Próximas características que se implementaran
        </Text>
        <div className='flex flex-col gap-4 flex-wrap justify-center'>
          <div className='flex flex-grow-1 flex-col  gap-3 max-w-md  p-4 justify-between bg-white rounded-md shadow-lg'>
            <div className='flex flex-col gap-2'>
              <Text classname='text-indigo-800 text-sm drop-shadow-md font-semibold'>Consulta Múltiples Registros</Text>
              <Text classname='text-sm drop-shadow-md'>
                ¿Varios códigos para consultar? ¡No hay problema! Ahorra tiempo y consulta todos tus registros al mismo
                tiempo.
              </Text>
            </div>
          </div>
          <div className='flex flex-grow-1 flex-col  gap-3 max-w-md  p-4 justify-between bg-white rounded-md shadow-lg'>
            <div className='flex flex-col gap-2'>
              <Text classname='text-indigo-800 text-sm drop-shadow-md font-semibold'>Alertas Mensuales</Text>
              <Text classname='text-sm drop-shadow-md'>
                Programa alertas mensuales para recibir notificaciones sobre cambios en los registros sanitarios que te
                interesan. Mantente siempre informado sin esfuerzo.
              </Text>
            </div>
          </div>
          <div className='flex flex-grow-1 flex-col  gap-3 max-w-md  p-4 justify-between bg-white rounded-md shadow-lg'>
            <div className='flex flex-col gap-2'>
              <Text classname='text-indigo-800 text-sm drop-shadow-md font-semibold'>
                Bases de datos de meses anteriores
              </Text>
              <Text classname='text-sm drop-shadow-md'>
                Podras consultar en bases de meses pasados, en caso de que requieras validar cambios pasados
              </Text>
            </div>
          </div>
          <div className='flex flex-grow-1 flex-col  gap-3 max-w-md  p-4 justify-between bg-white rounded-md shadow-lg'>
            <div className='flex flex-col gap-2'>
              <Text classname='text-indigo-800 text-sm drop-shadow-md font-semibold'>Integraciones personalizadas</Text>
              <Text classname='text-sm drop-shadow-md'>
                ¿Necesitas implementar consultas en tu propio sistema?, por medio de una API podras hacer consultas
                directamente desde tu sistema
              </Text>
            </div>
          </div>
          <a
            className=' mt-8 py-3 px-6 text-center self-center  bg-indigo-500 rounded-md text-md hover:bg-indigo-800 max-sm:text-sm'
            href='/app'
          >
            Ingresa y realiza tus consultas
          </a>
        </div>
      </div>
    </div>
  )
}
