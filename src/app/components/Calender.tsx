import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import {
  endOfLastMonth,
  endOfMonth,
  nowDate,
  startOfMonth,
  targetDateF,
} from '../utils/dayjs'

type boxProps = { ymd: ymd; isTarget: boolean }

type ymd = { y: number; m: number; d: number }

function Calender(props: {
  selectDayjs: Dayjs
  setSelectDayjs: Dispatch<SetStateAction<Dayjs>>
}) {
  const weekHeader = ['日', '月', '火', '水', '木', '金', '土']
  const [list, setList] = useState<boxProps[]>([])
  const [showMonthDiff, setShowMonthDiff] = useState(0)

  const prevMonthList = (
    y: number,
    m: number,
    startOfMonthWeek: number,
    endOfLastMonthDay: number,
  ) => {
    const tmplist: boxProps[] = []
    for (
      let i = endOfLastMonthDay - startOfMonthWeek + 1;
      i <= endOfLastMonthDay;
      i++
    ) {
      tmplist.push({ ymd: { y, m, d: i }, isTarget: false })
    }
    return tmplist
  }

  const middleList = (y: number, m: number, endOfMonthDay: number) => {
    const tmplist: boxProps[] = []
    for (let i = 1; i <= endOfMonthDay; i++) {
      tmplist.push({ ymd: { y, m, d: i }, isTarget: true })
    }
    return tmplist
  }

  const nextMonthList = (y: number, m: number, endOfMonthWeek: number) => {
    const tmplist: boxProps[] = []
    for (let i = 1; i <= 6 - endOfMonthWeek; i++) {
      tmplist.push({ ymd: { y, m, d: i }, isTarget: false })
    }
    return tmplist
  }

  const culcList = (target: Dayjs) => {
    let tmpList: boxProps[] = []
    const y = Number(targetDateF(target, 'YYYY').toString())
    const m = Number(targetDateF(target, 'M').toString())
    const d = Number(targetDateF(target, 'D').toString())
    console.log(d)
    const startOfMonthWeek = Number(startOfMonth(target, 'd').toString()) //今月の初日の曜日番号 0,1,2,3,4,5,6
    const endOfLastMonthDay = Number(endOfLastMonth(target, 'D').toString()) //先月の最終日の日 1~31
    const endOfMonthWeek = Number(endOfMonth(target, 'd').toString()) //今月の最終日の曜日番号 0,1,2,3,4,5,6
    const endOfMonthDay = Number(endOfMonth(target, 'D').toString()) //今月の最終日

    if (startOfMonthWeek === 0) {
      //初月日が日曜日の場合
      tmpList = [...tmpList, ...middleList(y, m, d)]
    } else {
      //初月日が日曜日ではない場合
      tmpList = [
        ...tmpList,
        ...prevMonthList(y, m, startOfMonthWeek, endOfLastMonthDay),
      ]
      tmpList = [...tmpList, ...middleList(y, m, endOfMonthDay)]
    }

    if (endOfMonthWeek === 6) {
      //最終日が日曜日の場合
      //なにもしない
    } else {
      //最終日が日曜日ではない場合
      tmpList = [...tmpList, ...nextMonthList(y, m, endOfMonthWeek)]
    }

    return tmpList
  }

  const targetYYYYMM = (showMonthDiff: number) => {
    return (
      targetDateF(nowDate().add(showMonthDiff, 'month'), 'YYYY') +
      '年' +
      targetDateF(nowDate().add(showMonthDiff, 'month'), 'M').toString() +
      '月'
    )
  }

  const boxStyle = (box: boxProps) => {
    const boxymd =
      box.ymd.y.toString() + box.ymd.m.toString() + box.ymd.d.toString()
    const selectymd =
      targetDateF(props.selectDayjs, 'YYYY') +
      targetDateF(props.selectDayjs, 'M') +
      targetDateF(props.selectDayjs, 'D')

    if (box.isTarget && boxymd !== selectymd) {
      return 'bg-slate-800 text-white'
    } else if (box.isTarget && boxymd === selectymd) {
      return 'bg-orange-400 text-black'
    } else {
      return 'bg-gray-50 text-black'
    }
  }

  useEffect(() => {
    setList(
      JSON.parse(
        JSON.stringify(culcList(nowDate().add(showMonthDiff, 'month'))),
      ),
    )
  }, [showMonthDiff])

  const selectBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ymd = JSON.parse(e.currentTarget.value) as ymd
    props.setSelectDayjs(
      dayjs(
        ymd.y.toString() + ('00' + ymd.m).slice(-2) + ('00' + ymd.d).slice(-2),
      ),
    )
  }

  const prevMonth = () => {
    setShowMonthDiff(showMonthDiff - 1)
  }
  const nextMonth = () => {
    setShowMonthDiff(showMonthDiff + 1)
  }

  return (
    <div>
      <div>
        {targetYYYYMM(showMonthDiff)}
        <div className="grid h-[460px] grid-cols-7 gap-4  xl:w-8/12">
          {weekHeader.map((w, key) => (
            <button key={key}>{w}</button>
          ))}
          {list.map((box, key) => (
            <button
              key={key}
              value={JSON.stringify(box.ymd)}
              className={boxStyle(box)}
              onClick={box.isTarget ? selectBox : undefined}
            >
              {box.ymd.d}
            </button>
          ))}
        </div>
      </div>

      <button
        className="mt-4 h-16 w-full bg-custom-blue p-2 text-white xl:w-8/12"
        onClick={prevMonth}
      >
        前の月へ
      </button>
      <button
        className="mt-4 h-16 w-full bg-custom-blue p-2 text-white xl:w-8/12"
        onClick={nextMonth}
      >
        次の月へ
      </button>
    </div>
  )
}

export default Calender
