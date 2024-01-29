import { type CSSProperties } from 'react'

interface TextProps {
  readonly children?: React.ReactNode | string
  readonly classname?: string
  readonly unselectable?: boolean
}

export default function Text({ children, classname = '', unselectable }: TextProps): JSX.Element {
  const customStyles: CSSProperties = {
    userSelect: unselectable === true ? 'none' : 'auto',
  }

  return (
    <p className={`text-gray-700 ${classname}`} style={customStyles}>
      {children}
    </p>
  )
}
