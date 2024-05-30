function Sidebar() {
  return (
    <div className="absolute hidden h-full bg-custom-blue text-white shadow-md  sm:block sm:w-64">
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
          href=""
          className="block p-4 hover:bg-gray-50 hover:text-custom-blue"
        >
          よやく
        </a>
      </nav>
    </div>
  )
}

export default Sidebar
