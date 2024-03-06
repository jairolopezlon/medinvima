import { Text } from '@/components/atoms'

interface Props {
  readonly customClass?: string
}

export default function HomeContact({ customClass }: Props): JSX.Element {
  return (
    <div className='flex items-center justify-center bg-indigo-100/30'>
      <div className='flex flex-col p-4 items-center justify-center max-w-6xl gap-8 my-20'>
        <Text classname='text-indigo-500 font-semibold text-3xl max-md:text-xl text-center drop-shadow-md'>
          ¿Tienes dudas o algunas ideas sobre esta app o este tema?
          <br />
          No dudes en ponerte en contacto
        </Text>
        <div className='flex flex-col gap-4 flex-wrap justify-center'>
          <a
            className=' py-3 px-6 text-center self-center rounded-md border-2 border-indigo-400 text-indigo-400 font-semibold text-md hover:bg-indigo-50 hover:border-indigo-600 hover:text-indigo-600 max-sm:text-sm'
            href='https://wa.me/+573205911272'
            rel='noreferrer'
            target='_blank'
          >
            Escríbeme en WhatsApp
          </a>
          <a
            className=' py-3 px-6 text-center self-center rounded-md border-2 border-indigo-400 text-indigo-400 font-semibold text-md hover:bg-indigo-50 hover:border-indigo-600 hover:text-indigo-600 max-sm:text-sm'
            href='https://www.linkedin.com/in/jairolopezlon/'
            rel='noreferrer'
            target='_blank'
          >
            Agrégame en LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
