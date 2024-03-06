import { Text } from '@/components/atoms'
interface Props {
  readonly customClass?: string
}

export default function OnboardingUseApp({ customClass }: Props): JSX.Element {
  return (
    <div className='flex items-center justify-center bg-indigo-50/90'>
      <div className='flex flex-col p-4 items-center justify-center max-w-6xl gap-8 my-20'>
        <Text classname='text-indigo-500 font-semibold text-3xl max-md:text-xl text-center drop-shadow-md'>
          En pocos pasos puedes hacer consultas de registros sanitarios
        </Text>
        <div className='flex gap-2 flex-wrap justify-center'>
          <div className='flex flex-grow-1 flex-col  gap-3 max-w-[240px] p-4 justify-between bg-white rounded-md shadow-md'>
            <div className='flex flex-col gap-2'>
              <Text classname='text-sm drop-shadow-md font-semibold'>Paso 1: Registrate</Text>
              <Text classname='text-sm drop-shadow-md'>
                Crea facilmente una cuenta de acceso, solo necesitas tu correo electronico.
              </Text>
            </div>
            <a className='text-indigo-500 drop-shadow-md font-bold text-sm self-end' href='/app/registro'>
              Ir a Registro
            </a>
          </div>
          <div className='flex flex-grow-1 flex-col  gap-3 max-w-[240px] p-4 justify-between  bg-white rounded-md shadow-md :'>
            <div className='flex flex-col gap-2'>
              <Text classname='text-sm drop-shadow-md font-semibold'>Paso 2: Ingresa</Text>
              <Text classname='text-sm drop-shadow-md'>
                Usa el correo y la constraseña que creaste para iniciar sesion.
              </Text>
            </div>
            <a className='text-indigo-500 drop-shadow-md font-bold text-sm self-end' href='/app/ingreso'>
              Ir a Ingreso
            </a>
          </div>
          <div className='flex flex-grow-1 flex-col  gap-3 max-w-[240px] p-4 justify-between  bg-white rounded-md shadow-md'>
            <div className='flex flex-col gap-2'>
              <Text classname='text-sm drop-shadow-md font-semibold'>Paso 3: Usa el buscador</Text>
              <Text classname='text-sm drop-shadow-md'>
                Podras buscar segun el estado de registro, y por diferentes criterios: nombre comercial, generico,
                expediente y atc{' '}
              </Text>
            </div>
            <a className='text-indigo-500 drop-shadow-md font-bold text-sm self-end' href='/app'>
              Ir al Buscador
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
