import { Button, Text } from '@/components/atoms'
import { type IExpedienteItem } from '@/types'
import { useState } from 'react'

export default function CumItemCard({ cumData }: { readonly cumData: IExpedienteItem }): JSX.Element {
  const [showConsecutivos, setShowConsecutivos] = useState(false)

  const widthScreen = window.innerWidth
  const mobileMaxWidth = 500

  const {
    cantidad,
    descripcionatc,
    estadoregistro,
    expediente,
    formafarmaceutica,
    producto,
    registrosanitario,
    titular,
    unidadmedida,
    viaadministracion,
  } = cumData

  const handleShowConsecutivos = (): void => {
    setShowConsecutivos((currentValue) => !currentValue)
  }

  return (
    <div className='flex flex-col gap-1  border-indigo-300 border-1 rounded-md p-2 '>
      <div className='flex justify-between items-center'>
        <div className={`flex ${widthScreen < mobileMaxWidth ? 'gap-1 flex-col' : 'gap-2'}`}>
          <div className='flex gap-1'>
            <Text classname='text-xs '>CUM:</Text>
            <Text classname='text-xs font-semibold'>{expediente}</Text>
          </div>
          <div className='flex gap-1'>
            <Text classname='text-xs '>RS:</Text>
            <Text classname='text-xs font-semibold'>{registrosanitario}</Text>
          </div>
        </div>
        <div className='flex'>
          <Text classname='text-xs !text-gray-100 py-1 px-2 bg-indigo-500 rounded-xl'>{estadoregistro}</Text>
        </div>
      </div>
      <div className='flex flex-col'>
        <Text classname='text-sm font-semibold'>{titular}</Text>
        <Text classname='text-xl font-bold text-gray-800'>{producto}</Text>
        <Text classname='text-sm font-semibold'>{descripcionatc}</Text>
        <Text classname='text-xs italic'>{`${formafarmaceutica} de ${cantidad} ${unidadmedida} ${viaadministracion}`}</Text>
      </div>
      <div className='flex items-center justify-end'>
        <Button handleClick={handleShowConsecutivos} level='secondary' size='sm' type='button'>
          {showConsecutivos ? 'Ocultar Consecutivos' : 'Ver Consecutivos'}
        </Button>
      </div>
    </div>
  )
}
