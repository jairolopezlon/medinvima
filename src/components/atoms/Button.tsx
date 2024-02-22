import { type ButtonHTMLAttributes, useMemo } from 'react'

interface TextProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: React.ReactNode
  readonly classname?: string | undefined
  readonly size: 'xs' | 'sm' | 'md' | 'lg'
  readonly level: 'primary' | 'secondary' | 'tertiary'
  readonly disable?: boolean
  readonly handleClick?: () => void
  readonly type?: 'button' | 'submit' | 'reset' | undefined
}

const buttonSize = {
  lg: 'px-5 py-3 text-lg rounded-md',
  md: 'px-4 py-2 text-md rounded-md',
  sm: 'px-3 py-1 text-sm rounded',
  xs: 'px-2 py-1 text-xs rounded',
}

const buttonLevel = {
  primary: 'bg-indigo-700 text-gray-100 hover:bg-indigo-600 active:bg-indigo-800',
  secondary: 'bg-gray-600 text-gray-100 hover:bg-gray-500 active:bg-gray-700 ',
  tertiary: 'bg-gray-300 text-gray-700 hover:bg-gray-200 active:bg-gray-300 ',
}

const statusDisable = {
  primary: 'bg-indigo-300 text-gray-100 hover:bg-indigo-300 cursor-not-allowed',
  secondary: 'bg-gray-400 text-gray-100 hover:bg-gray-400 cursor-not-allowed',
  tertiary: 'bg-gray-200 text-gray-400 hover:bg-gray-200 cursor-not-allowed',
}

export default function Button({
  children,
  classname,
  size,
  level,
  disable,
  handleClick,
  type = 'button',
  ...restProps
}: TextProps): JSX.Element {
  const sizeClass = buttonSize[size] ?? ''
  const levelClass = buttonLevel[level] ?? ''
  const statusDisableClass = disable === true ? statusDisable[level] : ''

  const handleOnclick = useMemo(() => handleClick, [handleClick])

  return (
    <button
      className={`flex gap-1 justify-center items-center text-center  ${sizeClass}  ${
        disable === true ? statusDisableClass : levelClass
      } ${classname}`}
      disabled={disable}
      onClick={handleOnclick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...restProps}
    >
      {children}
    </button>
  )
}
