'use client'


import { HoCAuth } from '../components/auth/HoCAuth'
import { RCC } from '../components/RCC'
import Layout from '../components/Layout'
import Calender from '@/app/components/Calender'
import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import { nowDate } from '@/app/utils/dayjs'
import Time from '@/app/components/Time'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export default HoCAuth(function Book(props: Props) {
  const [mode, setMode] = useState<'day' | 'time'>('day')
  const [selectDayjs, setSelectDayjs] = useState<Dayjs>(nowDate())
  const [monthDiff, setMonthDiff] = useState(0)
  const [selectH, setSelectH] = useState<number[]>([])
  const [isCalenderReset, setIsCalenderReset] = useState<boolean>(false)
  const [isTimeReset, setIsTimeReset] = useState<boolean>(false)

  return (
    <Layout {...props}>
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
          />
        )}
        {mode === 'time' && (
          <Time
            selectH={selectH}
            setSelectH={setSelectH}
            isReset={isTimeReset}
            setIsReset={setIsTimeReset}
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
                  onClick={() => setMode('time')}
                  className="ml-5 mt-5 h-16 w-20 bg-custom-blue text-white xl:w-60"
                >
                  次
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
})
