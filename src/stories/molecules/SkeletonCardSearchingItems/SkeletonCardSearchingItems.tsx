import { LoaderSpinner } from '@/assets/svg'
import { Skeleton } from '@components/atoms'
import { Text } from '@/components/atoms'

interface Props {
  readonly customClass?: string | undefined
}

export default function SkeletonCardSearchingItems({ customClass }: Props): JSX.Element {
  return (
    <Skeleton customClass='!flex-col sm:!flex-row  gap-1 p-4 ' height={150} radius={4}>
      <LoaderSpinner color='#999' size={24} />
      <Text classname='font-semibold dark:text-gray-50 text-center' unselectable>
        Buscando registros sanitarios...
      </Text>
    </Skeleton>
  )
}
