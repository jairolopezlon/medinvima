import { Text } from '@/components/atoms'

export default function CardInitialSearchItems(): JSX.Element {
  return (
    <div className='flex flex-col rounded-md p-6 bg-gray-200 justify-center items-center gap-2'>
      <Text classname='font-semibold text-center text-sm' unselectable='on'>
        Ingresa los datos de tu búsqueda, puedes buscar por:
      </Text>
      <ul className='text-gray-700 list-disc text-xs flex flex-col gap-1'>
        <li>Número de expediente</li>
        <li>Código ATC</li>
        <li>Principio Activo</li>
        <li>Nombre Comercial</li>
        <li>Filtrar por estados</li>
      </ul>
    </div>
  )
}
