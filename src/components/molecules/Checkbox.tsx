import { type ChangeEvent } from 'react'
import { UNDEFINED } from '@/constants'

interface Props {
  readonly fieldName: string
  readonly handleChange?: ({ fieldName, value }: { fieldName: string; value: boolean }) => void
  readonly label: string
  readonly state: boolean
  readonly value: string
}

export default function Checkbox({ fieldName, handleChange, label, state, value }: Props): JSX.Element {
  const inputId = `${fieldName}-${value}`

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.currentTarget.checked
    if (handleChange !== UNDEFINED) {
      handleChange({ fieldName, value: inputValue })
    }
  }

  return (
    <div className='flex gap-1'>
      <input id={inputId} name={fieldName} onChange={handleInputChange} type='checkbox' value={value} />
      <label className='text-xs text-gray-700' htmlFor={inputId}>
        {label}
      </label>
    </div>
  )
}
