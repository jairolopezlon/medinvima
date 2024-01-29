/* eslint-disable react/no-unknown-property */
interface Props {
  readonly color: string
  readonly size: number
}
export default function LoaderSpinner({ color, size }: Props): JSX.Element {
  return (
    <svg height={size} viewBox='0 0 200 200' width={size} xmlns='http://www.w3.org/2000/svg'>
      <radialGradient cx='.66' cy='.3125' fx='.66' fy='.3125' gradientTransform='scale(1.5)' id='a12'>
        <stop offset='0' stopColor={color} />
        <stop offset='.3' stopColor={color} stopOpacity='.9' />
        <stop offset='.6' stopColor={color} stopOpacity='.6' />
        <stop offset='.8' stopColor={color} stopOpacity='.3' />
        <stop offset='1' stopColor={color} stopOpacity='0' />
      </radialGradient>
      <circle
        cx='100'
        cy='100'
        fill='none'
        r='70'
        stroke='url(#a12)'
        strokeDasharray='200 1000'
        strokeDashoffset='0'
        strokeLinecap='round'
        strokeWidth='40'
        transform-origin='center'
      >
        <animateTransform
          attributeName='transform'
          calcMode='spline'
          dur='2'
          keySplines='0 0 1 1'
          keyTimes='0;1'
          repeatCount='indefinite'
          type='rotate'
          values='360;0'
        />
      </circle>
      <circle
        cx='100'
        cy='100'
        fill='none'
        opacity='.2'
        r='70'
        stroke={color}
        strokeLinecap='round'
        strokeWidth='40'
        transform-origin='center'
      />
    </svg>
  )
}
