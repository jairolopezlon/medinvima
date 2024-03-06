import { Text } from '@/components/atoms'

interface Props {
  readonly customClass?: string
}

export default function HomeFooter({ customClass }: Props): JSX.Element {
  return (
    <div className='flex items-center justify-center bg-indigo-100/60'>
      <div className='flex flex-col p-4 items-center justify-center max-w-6xl gap-8 py-8'>
        <Text classname='text-indigo-700 italic text-sm max-md:text-xs text-center drop-shadow-md'>
          2024 Medinvima - Desarrollado por @jairolopezlon
        </Text>
      </div>
    </div>
  )
}
