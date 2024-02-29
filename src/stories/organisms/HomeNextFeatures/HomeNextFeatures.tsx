interface Props {
  readonly customClass?: string
}

export default function HomeNextFeatures({ customClass }: Props): JSX.Element {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <h1 className='text-indigo-700'>HomeNextFeatures</h1>
    </div>
  )
}
