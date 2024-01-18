interface TextProps {
  readonly children: string
  readonly classname: string
}

export default function Text({ children, classname = '' }: TextProps): JSX.Element {
  return <p className={`text-gray-700 ${classname}`}>{children}</p>
}
