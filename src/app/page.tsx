'use client'

import { useQuery } from '@apollo/client'
import { HoCAuth } from './components/auth/HoCAuth'
import Layout from './components/Layout'
import {
  GetAuthSubByCookieDocument,
  GetBookBySubDocument,
} from '@/graphql/generated/graphql'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export default HoCAuth(function Home(props: Props) {
  const { data, error, loading } = useQuery(GetBookBySubDocument, {
    variables: { input: { sub: props?.searchParams?.sub } },
    fetchPolicy: 'network-only',
  })

  return (
    <>
      <Layout {...props}>
        <main className="col-span-4 grid gap-4 p-4 md:col-span-8">
          <p>よやくです詳細をみるにはクリックしてください。</p>
          <div className="grid grid-cols-2 gap-1 text-white sm:grid-cols-4">
            {loading && (
              <div className="bg-slate-800 p-4 text-center">Loading...</div>
            )}
            {data?.getBookBySub &&
              data?.getBookBySub.length > 0 &&
              data?.getBookBySub.map((book) => {
                return (
                  <div
                    key={book?.bookId}
                    className="bg-slate-800 p-4 text-center"
                  >
                    {book?.day}
                  </div>
                )
              })}
          </div>
        </main>
      </Layout>
    </>
  )
})
