export default function AppHeader(): React.JSX.Element {
  return (
    <div className='flex justify-between py-2 px-4 border-b-1 border-b-indigo-200'>
      <div className='brand'>
        <span className='nameApp bg-gradient-to-r  from-indigo-600 to-blue-600 inline-block text-transparent bg-clip-text font-bold'>
          MedInvima
        </span>
      </div>
    </div>
  )
}
