export default function Skeleton({ classname }: { readonly classname: string }): JSX.Element {
  return (
    <div className='animate-pulse'>
      <div className={`bg-gray-200 dark:bg-gray-600  h-[50px] ${classname}`} />
    </div>
  )
}
