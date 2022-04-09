import Link from "next/link"

export default function Custom404() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='flex flex-col items-center justify-center'>
        <h3 className='font-bold text-8xl'>404</h3>
        <p className='mb-5 text-3xl'>Page not found :(</p>
        <Link href='/' passHref>
          <a>
            <button className='p-2 px-3 transition-colors duration-300 ease-out border-2 border-black border-solid hover:bg-black hover:text-white'>
              Go back
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}
