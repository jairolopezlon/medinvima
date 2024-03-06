import { type CSSProperties } from 'react'

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  readonly children?: React.ReactNode | string
  readonly classname?: string
}

export default function Text({ children, classname = '', unselectable }: TextProps): JSX.Element {
  const customStyles: CSSProperties = {
    userSelect: unselectable === 'on' ? 'none' : 'auto',
  }

  return (
    <p className={`text-gray-700 ${classname}`} style={customStyles}>
      {children}
    </p>
  )
}
