type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

function Sidebar(props: Props) {
  return (
    <div className="absolute block size-full bg-custom-blue/90  text-white shadow-md sm:w-64 sm:bg-custom-blue  ">
      <nav className="text-base font-semibold ">
        <a
          href=""
          className="block p-4 hover:bg-gray-50 hover:text-custom-blue"
        >
          トップへ
        </a>
        <a
          href=""
          className="block p-4 hover:bg-gray-50 hover:text-custom-blue"
        >
          あばうと
        </a>
        <a
          href={`/book?sub=${props?.searchParams?.sub}`}
          className="block p-4 hover:bg-gray-50 hover:text-custom-blue"
        >
          よやく
        </a>
      </nav>
    </div>
  )
}

export default Sidebar
