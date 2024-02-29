
interface Props {
  readonly customClass?: string
}

export default function HomeFooter({customClass}:Props): JSX.Element {
  return (
    <div className={` ${customClass} `}>
      <h1>HomeFooter</h1>
    </div>
  )
}