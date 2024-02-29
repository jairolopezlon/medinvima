
interface Props {
  readonly customClass?: string
}

export default function HomeContact({customClass}:Props): JSX.Element {
  return (
    <div className={` ${customClass} `}>
      <h1>HomeContact</h1>
    </div>
  )
}