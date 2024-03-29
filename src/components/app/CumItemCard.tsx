import { Button, Text } from '@/components/atoms'
import { type CumNameBase, type IConsecutiveItem, type IExpedienteItem } from '@/types'
import { ConsecutiveListItems } from '@/stories/organisms'
import { type ISearchConsecutivesProps } from '@/hooks'
import { LoaderSpinner } from '@/assets/svg'
import { UNDEFINED } from '@/constants'
import { useState } from 'react'

interface Props {
  readonly consecutivesData?: IConsecutiveItem[]
  readonly isFetchingConsecutives: boolean
  readonly cumData: IExpedienteItem
  readonly searchConsecutives: ({ expediente, expedienteStatus }: ISearchConsecutivesProps) => Promise<void>
}

export default function CumItemCard({
  consecutivesData,
  isFetchingConsecutives,
  cumData,
  searchConsecutives,
}: Props): JSX.Element {
  const [showConsecutivos, setShowConsecutivos] = useState(false)

  const widthScreen = window.innerWidth
  const mobileMaxWidth = 500

  const {
    atc,
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

  const getTargetData = (estadoRegistro: string): CumNameBase => {
    if (estadoRegistro === 'Vigente') return 'vigentes'
    if (estadoRegistro === 'En tramite renov') return 'renovacion'
    if (estadoRegistro === 'Vencido') return 'vencidos'
    return 'otros'
  }

  const dataBaseTarget = getTargetData(estadoregistro)

  const handleShowConsecutivos = (): void => {
    setShowConsecutivos((currentValue) => !currentValue)
    void searchConsecutives({ expediente, expedienteStatus: dataBaseTarget })
  }

  const statusItemClass = {
    otros: 'bg-red-400',
    renovacion: 'bg-orange-300',
    vencidos: 'bg-red-400',
    vigentes: 'bg-lime-400',
  }

  return (
    <div className='flex flex-col gap-2  border-indigo-300 border-1 rounded-md p-2 '>
      <div className='flex justify-between items-start'>
        <div className={`flex ${widthScreen < mobileMaxWidth ? 'gap-1 flex-col' : 'gap-2'}`}>
          <div className='flex gap-1'>
            <Text classname='text-xs '>ATC:</Text>
            <Text classname='text-xs font-semibold'>{atc}</Text>
          </div>
          <div className='flex gap-1'>
            <Text classname='text-xs '>Expediente:</Text>
            <Text classname='text-xs font-semibold'>{expediente}</Text>
          </div>
          <div className='flex gap-1'>
            <Text classname='text-xs '>RS:</Text>
            <Text classname='text-xs font-semibold'>{registrosanitario.replace('INVIMA', '').trim()}</Text>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <Text classname='text-xs '>Estado:</Text>
          <Text classname='text-xs font-semibold'>{estadoregistro}</Text>
          <div className={`w-3 h-3 rounded-full ${statusItemClass[dataBaseTarget]}`} />
        </div>
      </div>
      <div className='flex flex-col'>
        <Text classname='text-sm font-semibold'>{titular}</Text>
        <Text classname='text-xl font-bold text-gray-800'>{producto}</Text>
        <Text classname='text-sm font-semibold'>{descripcionatc}</Text>
        <Text classname='text-xs italic'>{`${formafarmaceutica} de ${cantidad} ${unidadmedida} ${viaadministracion}`}</Text>
      </div>
      <div className='flex items-center justify-end'>
        <Button handleClick={handleShowConsecutivos} level='secondary' size='xs' type='button'>
          {showConsecutivos ? 'Ocultar Consecutivos' : 'Ver Consecutivos'}
        </Button>
      </div>
      {showConsecutivos ? (
        <div className=''>
          {isFetchingConsecutives ? (
            <div className='flex justify-center items-center gap-1 p-4'>
              <LoaderSpinner color='#777' size={16} />
              <Text classname='text-xs'>Buscando Consecutivos...</Text>
            </div>
          ) : null}
          {consecutivesData === UNDEFINED ? null : (
            <ConsecutiveListItems atc={atc} consecutiveData={consecutivesData} />
          )}
        </div>
      ) : null}
    </div>
  )
}
