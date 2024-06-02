'use client'


import { HoCAuth } from '../components/auth/HoCAuth'
import { RCC } from '../components/RCC'
import Layout from '../components/Layout'
import Calender from '@/app/components/Calender'
import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import { nowDate, targetDateF } from '@/app/utils/dayjs'
import Time from '@/app/components/Time'
import BookDetailModal from '@/app/components/BookDetailModal'
import client from '../../lib/client'
import type { CreateBookMutation } from '../../graphql/generated/graphql'
import {
  CreateBookDocument,
  GetBookByMonthDocument,
} from '../../graphql/generated/graphql'
import { ApolloProvider, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export type BookProps = {
  day?: number | null | undefined
  time?: number | null | undefined
  subOnlyMe?: string | null | undefined
  bookType?: string | null | undefined
}

export default HoCAuth(function Book(props: Props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [mode, setMode] = useState<'day' | 'time'>('day')
  const [selectDayjs, setSelectDayjs] = useState<Dayjs>(nowDate())
  const [monthDiff, setMonthDiff] = useState(0)
  const [selectH, setSelectH] = useState<number[]>([])
  const [isCalenderReset, setIsCalenderReset] = useState<boolean>(false)
  const [isTimeReset, setIsTimeReset] = useState<boolean>(false)
  let book: BookProps[] = []
  let time: BookProps[] | undefined = []

  /*** キャッシュにのこしたい */
  useQuery(GetBookByMonthDocument, {
    variables: {
      input: {
        yyyymm: Number(
          targetDateF(nowDate().add(monthDiff - 1, 'month'), 'YYYYMM'),
        ),
      },
    },
    onCompleted() {
      refetch()
    },
  })
  /*** キャッシュにのこしたい */
  useQuery(GetBookByMonthDocument, {
    variables: {
      input: {
        yyyymm: Number(
          targetDateF(nowDate().add(monthDiff + 1, 'month'), 'YYYYMM'),
        ),
      },
    },
    onCompleted() {
      refetch()
    },
  })

  const { data, error, loading, refetch } = useQuery(GetBookByMonthDocument, {
    variables: {
      input: {
        yyyymm: Number(
          targetDateF(nowDate().add(monthDiff, 'month'), 'YYYYMM'),
        ),
      },
    },
    onCompleted() {
      refetch()
    },
  })

  if (data && data?.getBookByMonth) {
    book = data.getBookByMonth.map((b) => {
      return {
        day: b?.day,
        time: b?.time,
        subOnlyMe: b?.subOnlyMe,
        bookType: b?.bookType,
      }
    })
    time = Object.groupBy(
      data.getBookByMonth.map((b) => {
        return {
          day: b?.day || 0,
          time: b?.time || 0,
          subOnlyMe: b?.subOnlyMe || '',
          bookType: b?.bookType || '',
        }
      }),
      ({ day }) => day ?? 0,
    )[Number(targetDateF(selectDayjs, 'YYYYMMDD'))]
  }

  return (
    <Layout {...props}>
      <BookDetailModal
        open={isOpen2}
        onCancel={() => setIsOpen2(false)}
        onOk={() => {
          setIsOpen2(false)
          router.push('/')
        }}
        okLabel="OK"
        title="成功"
      >
        登録が完了しました。
      </BookDetailModal>
      <BookDetailModal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={async () => {
          const { data } = await client.mutate<CreateBookMutation>({
            mutation: CreateBookDocument,
            variables: {
              input: {
                sub: '', //server側でtokenからセットしなおすため空白
                day: Number(targetDateF(selectDayjs, 'YYYYMMDD')),
                time: selectH,
                bookType: '1',
              },
            },
          })
          if (
            data &&
            data?.createBook &&
            data?.createBook.length === selectH.length
          ) {
            console.log('success')
          }
          setIsOpen(false)
          setIsOpen2(true)
        }}
        okLabel="登録"
        closeLabel="閉じる"
        title={`${targetDateF(selectDayjs, 'YYYY年M月D日')}`}
      >
        以下登録します
        {selectH
          .sort((a, b) => a - b)
          .map((h, i) => (
            <p key={i}>{h.toString() + '時~' + (h + 1).toString() + '時'}</p>
          ))}
      </BookDetailModal>
      {loading && (
        <>
          <div className="my-20 flex justify-center">
            <div className="size-72 animate-spin rounded-xl bg-custom-blue"></div>
          </div>
        </>
      )}
      {book && (
        <main className="col-span-4 grid gap-4 p-4 md:col-span-8">
          <RCC sub={props?.searchParams?.sub} />
          {mode === 'day' && (
            <Calender
              selectDayjs={selectDayjs}
              setSelectDayjs={setSelectDayjs}
              monthDiff={monthDiff}
              setMonthDiff={setMonthDiff}
              isReset={isCalenderReset}
              setIsReset={setIsCalenderReset}
              book={book}
            />
          )}
          {mode === 'time' && (
            <Time
              selectH={selectH}
              setSelectH={setSelectH}
              isReset={isTimeReset}
              setIsReset={setIsTimeReset}
              time={time}
            />
          )}
          <div className="w-full xl:w-8/12">
            <div className="flex items-center justify-center">
              {mode === 'day' && (
                <>
                  <button
                    onClick={() => {
                      setIsCalenderReset(true)
                    }}
                    className=" mt-5 h-16 w-32 bg-custom-blue text-white xl:w-60"
                  >
                    リセット
                  </button>
                  <button
                    onClick={() => {
                      setMode('time')
                    }}
                    className="ml-5 mt-5 h-16 w-32 bg-custom-blue text-white xl:w-60"
                  >
                    次
                  </button>
                </>
              )}
              {mode === 'time' && (
                <>
                  <button
                    onClick={() => setMode('day')}
                    className=" mt-5 h-16 w-20 bg-custom-blue text-white xl:w-60"
                  >
                    前
                  </button>
                  <button
                    onClick={() => setIsTimeReset(true)}
                    className="ml-5 mt-5 h-16 w-20 bg-custom-blue text-white xl:w-60"
                  >
                    リセット
                  </button>
                  <button
                    disabled={selectH.length === 0}
                    onClick={() => setIsOpen(true)}
                    className={
                      selectH.length !== 0
                        ? 'ml-5 mt-5 h-16 w-20 bg-custom-blue text-white xl:w-60'
                        : 'ml-5 mt-5 h-16 w-20 cursor-not-allowed bg-gray-300 text-black opacity-50 xl:w-60'
                    }
                  >
                    確定
                  </button>
                </>
              )}
            </div>
          </div>
        </main>
      )}
    </Layout>
  )
})
