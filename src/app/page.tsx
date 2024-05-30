import Link from 'next/link'
import { HoCAuth } from './components/HoCAuth'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export default HoCAuth(function Home(props: Props) {
  return (
    <main>
      <div className="grid min-h-screen w-screen place-items-center bg-gray-400">
        <Link
          type="button"
          href={`/book?sub=${props?.searchParams?.sub}`}
          className="border bg-white text-gray-900"
        >
          Bookへ
        </Link>
      </div>
    </main>
  )
})
