'use client'

import { useQuery } from '@apollo/client'
import { HoCAuth } from './components/auth/HoCAuth'
import Layout from './components/Layout'
import { GetBookBySubDocument } from '@/graphql/generated/graphql'
import BookDetailModal from '@/app/components/BookDetailModal'
import { useEffect, useState } from 'react'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

type bookDetail = {
  time: number
  day: number
  bookType: string
}

type bookDetails = Array<bookDetail>

type booksByDay = Partial<
  Record<
    number,
    ({
      __typename?: 'Book' | undefined
      bookId: string
      day?: number | null | undefined
      time?: number | null | undefined
      sub?: string | null | undefined
      bookType?: string | null | undefined
      createdAt?: string | null | undefined
      updatedAt?: string | null | undefined
    } | null)[]
  >
>

export default HoCAuth(function Home(props: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [booksByDay, setBooksByDay] = useState<booksByDay>()
  const [bookDetails, setBookDetails] = useState<bookDetails>([])
  const { data, error, loading } = useQuery(GetBookBySubDocument, {
    variables: { input: { sub: props?.searchParams?.sub } },
    fetchPolicy: 'network-only',
  })
  const books = data?.getBookBySub

  useEffect(() => {
    if (books && books.length > 0) {
      setBooksByDay(Object.groupBy(books, (book) => book?.day || 0))
    }
  }, [books])

  return (
    <>
      <Layout {...props}>
        <BookDetailModal
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          onOk={() => setIsOpen(false)}
          title={
            bookDetails?.length > 0 ? bookDetails[0].day.toString() : 'none'
          }
        >
          {bookDetails.map((b) => `${b.time}時~${b.time + 1}時`).join()}
        </BookDetailModal>
        <main className="col-span-4 grid gap-4 p-4 md:col-span-8">
          <p>いちらんです詳細をみるにはクリックしてください。</p>
          <div className="grid grid-cols-2 gap-1 text-white sm:grid-cols-4">
            {loading && (
              <div className="bg-slate-800 p-4 text-center">Loading...</div>
            )}
            {booksByDay &&
              Object.keys(booksByDay).length > 0 &&
              Object.keys(booksByDay).map((day: string) => {
                return (
                  <div
                    key={day}
                    className="bg-slate-800 p-4 text-center"
                    onClick={() => {
                      setBookDetails(
                        booksByDay[Number(day)]?.map((bookDetail) => {
                          return {
                            day: bookDetail?.day || 0,
                            time: bookDetail?.time || 0,
                            bookType: bookDetail?.bookType || '',
                          }
                        }) || [],
                      )
                      setIsOpen(true)
                    }}
                  >
                    {day}
                  </div>
                )
              })}
          </div>
        </main>
      </Layout>
    </>
  )
})
