import { type CSSProperties } from 'react'
import { type IConsecutiveItem } from '@/types'
import { formatCUM } from '@/utils'

interface Props {
  readonly atc: string
  readonly consecutiveData: IConsecutiveItem[]
  readonly customClass?: string
}

export default function ConsecutiveListItems({ atc, consecutiveData, customClass }: Props): JSX.Element {
  const widthScreen = window.innerWidth
  const mobileMaxWidth = 500
  return (
    <div className={` p-2  ${widthScreen < mobileMaxWidth ? 'overflow-x-scroll' : ''}  ${customClass} `}>
      <table
        className={` ${
          widthScreen < mobileMaxWidth ? 'table-fixed w-max' : 'table-auto'
        } text-gray-700 min-w-full divide-y divide-gray-300 border-collapse`}
      >
        <thead>
          <tr>
            <th className='font-semibold text-xs py-2 px-2 text-left'>CUM</th>
            <th className='font-semibold text-xs py-2 px-2 text-left'>Descripción comercial</th>
            <th className='font-semibold text-xs py-2 px-2 text-left w-12'>Muestra médica</th>
            <th className='font-semibold text-xs py-2 px-2 text-left'>Estado</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-300'>
          {consecutiveData.map((consecutiveItem) => {
            const { consecutivocum, descripcioncomercial, estadocum, expediente, muestramedica } = consecutiveItem

            const cum = formatCUM({
              atc,
              consecutivo: consecutivocum,
              expediente,
            })

            const cumCellStyles: CSSProperties = { textWrap: 'nowrap' }

            return (
              <tr key={cum}>
                <td className='text-xs py-2 px-2' style={cumCellStyles}>
                  {cum}
                </td>
                <td className='text-xs py-2 px-2 w-full'>{descripcioncomercial.toLowerCase()}</td>
                <td className='text-xs py-2 px-2'>{muestramedica.toLowerCase()}</td>
                <td className='text-xs py-2 px-2'>{estadocum.toLowerCase()}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
