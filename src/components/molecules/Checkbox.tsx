import { type ChangeEvent } from 'react'
import { type CumNameBase } from '@/types'
import { UNDEFINED } from '@/constants'

interface Props {
  readonly fieldName: string
  readonly handleChange?: ({ fieldValue, checkedValue }: { fieldValue: CumNameBase; checkedValue: boolean }) => void
  readonly label: string
  readonly state: boolean
  readonly value: CumNameBase
}

export default function Checkbox({ fieldName, handleChange, label, state, value }: Props): JSX.Element {
  const inputId = `${fieldName}-${value}`

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (handleChange !== UNDEFINED) {
      const { checked, value: fieldValue } = event.currentTarget
      handleChange({ checkedValue: checked, fieldValue: fieldValue as CumNameBase })
    }
  }

  return (
    <div className='flex gap-1'>
      <input checked={state} id={inputId} name={fieldName} onChange={handleInputChange} type='checkbox' value={value} />
      <label className='text-xs text-gray-700' htmlFor={inputId}>
        {label}
      </label>
    </div>
  )
}
