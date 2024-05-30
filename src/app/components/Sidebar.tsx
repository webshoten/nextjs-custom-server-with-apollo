import Link from 'next/link'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

function Sidebar(props: Props) {
  return (
    <div className="absolute block size-full bg-custom-blue/90  text-white shadow-md sm:w-64 sm:bg-custom-blue  ">
      <nav className="text-base font-semibold ">
        <Link
          href="/login"
          className="block p-4 hover:bg-gray-50 hover:text-custom-blue"
        >
          ログインへ
        </Link>
        <Link
          href={`/?sub=${props?.searchParams?.sub}`}
          className="block p-4 hover:bg-gray-50 hover:text-custom-blue"
        >
          いちらん
        </Link>
        <Link
          href={`/book?sub=${props?.searchParams?.sub}`}
          className="block p-4 hover:bg-gray-50 hover:text-custom-blue"
        >
          よやく
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
