interface Props {
  readonly children?: React.ReactNode | string
  readonly customClass?: string
  readonly height?: number
  readonly radius?: number
  readonly rounded?: boolean
  readonly width?: number
}

export default function Skeleton({
  children,
  customClass,
  height,
  radius,
  rounded = false,
  width,
}: Props): JSX.Element {
  const getRadius = ({ isRounded, radiusValue }: { isRounded: boolean; radiusValue?: number }): string => {
    if (isRounded) {
      return '50%'
    }
    if (typeof radiusValue === 'number') {
      return `${radiusValue}px`
    }
    return '0px'
  }

  const defaultStyles = {
    height: '100%',
    width: '100%',
  }

  const customStyles = {
    borderRadius: getRadius({ isRounded: rounded, radiusValue: radius }),
    height: typeof height === 'number' ? `${height}px` : defaultStyles.height,
    width: typeof width === 'number' ? `${width}px` : defaultStyles.width,
  }

  return (
    <div className='animate-pulse'>
      <div
        className={`bg-gray-300 dark:bg-gray-600 flex flex-col justify-center items-center  ${customClass ?? ''}`}
        style={customStyles}
      >
        {children}
      </div>
    </div>
  )
}
