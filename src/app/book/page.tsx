'use client'

import { HoCAuth } from '../components/auth/HoCAuth'
import { RCC } from '../components/RCC'
import Layout from '../components/Layout'
import Calender from '@/app/components/Calender'
import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import { nowDate, targetDateF } from '@/app/utils/dayjs'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export default HoCAuth(function Book(props: Props) {
  const [mode, setMode] = useState<'day' | 'time'>('day')
  const [selectDayjs, setSelectDayjs] = useState<Dayjs>(nowDate())

  return (
    <Layout {...props}>
      <main className="col-span-4 grid gap-4 p-4 md:col-span-8">
        <RCC sub={props?.searchParams?.sub} />
        {mode === 'day' && (
          <Calender selectDayjs={selectDayjs} setSelectDayjs={setSelectDayjs} />
        )}
        {mode === 'time' && <>time</>}
        <div className="w-full xl:w-8/12">
          <div className="flex items-center justify-center">
            <button
              onClick={() => setSelectDayjs(nowDate())}
              className=" mt-5 h-16 w-60 bg-custom-blue text-white"
            >
              りせっと
            </button>
            <button
              onClick={() => setMode('time')}
              className="ml-5 mt-5 h-16 w-60 bg-custom-blue text-white"
            >
              次にすすむ
            </button>
          </div>
        </div>
      </main>
    </Layout>
  )
})
