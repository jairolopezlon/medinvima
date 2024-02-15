import { type ElementRef, type InputHTMLAttributes, type LegacyRef, type RefAttributes, forwardRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement>, RefAttributes<ElementRef<'input'>> {}

const inputtt = (
  { type, className, ...restProps }: Props,
  ref: LegacyRef<HTMLInputElement> | undefined,
): JSX.Element => (
  <input
    className={`text-sm rounded-md p-2 border-indigo-200 border-1 text-blue-900 focus:outline-indigo-700 ${className}`}
    ref={ref}
    type={type}
    {...restProps}
  />
)

export default forwardRef(inputtt)
