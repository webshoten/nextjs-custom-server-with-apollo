'use client'

export default function Navbar(props: { onToggle: () => void }) {
  return (
    <div className="h-16 w-full bg-custom-blue text-white shadow-md">
      <nav className="flex h-full items-center justify-between px-8">
        <div>
          <button className="block sm:hidden" onClick={props.onToggle}>
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                fillRule="evenodd"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </div>
  )
}
