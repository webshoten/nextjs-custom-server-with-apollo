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
import type { BookProps } from '@/app/book/page'
import { useSearchParams } from 'next/navigation'

type boxProps = { ymd: ymd; isTarget: boolean }

type ymd = { y: number; m: number; d: number }

function Calender(props: {
  selectDayjs: Dayjs
  setSelectDayjs: Dispatch<SetStateAction<Dayjs>>
  monthDiff: number
  setMonthDiff: Dispatch<SetStateAction<number>>
  isReset: boolean
  setIsReset: Dispatch<SetStateAction<boolean>>
  book: BookProps[]
}) {
  const searchParams = useSearchParams()
  const sub = searchParams.get('sub')
  const weekHeader = ['日', '月', '火', '水', '木', '金', '土']
  const [list, setList] = useState<boxProps[]>([])
  const dayBook = Object.groupBy(props.book, ({ day }) => day ?? 0)
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

  const culcBaseList = (target: Dayjs) => {
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
      tmpList = [...tmpList, ...middleList(y, m, endOfMonthDay)]
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
    const boxyyyymmdd =
      box.ymd.y.toString() +
      ('00' + box.ymd.m).slice(-2) +
      ('00' + box.ymd.d).slice(-2)

    const selectyyyymmdd =
      targetDateF(props.selectDayjs, 'YYYY') +
      targetDateF(props.selectDayjs, 'MM') +
      targetDateF(props.selectDayjs, 'DD')

    const isTarget = box.isTarget
    const isSelect = boxyyyymmdd === selectyyyymmdd
    const isMe = dayBook[Number(boxyyyymmdd)]
      ?.map((b) => b.subOnlyMe)
      .includes(sub)
    const isSomeone =
      !isMe &&
      dayBook[Number(boxyyyymmdd)]?.map((b) => b.subOnlyMe).includes('*')

    let boxstyle = ''

    if (isTarget && isSelect) {
      boxstyle += 'text-orange-500 font-extrabold '
    }

    if (isTarget && !isSelect && isMe) {
      boxstyle += 'bg-blue-500 text-white '
    } else if (isTarget && !isSelect && isSomeone) {
      boxstyle += 'bg-green-500 text-white '
    } else if (isTarget && !isSelect && !isMe && !isSomeone) {
      boxstyle += 'bg-slate-800 text-white '
    } else {
      boxstyle += 'bg-gray-50 text-black '
    }

    return boxstyle
  }

  const selectBox = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ymd = JSON.parse(e.currentTarget.value) as ymd
    props.setSelectDayjs(
      dayjs(
        ymd.y.toString() + ('00' + ymd.m).slice(-2) + ('00' + ymd.d).slice(-2),
      ),
    )
    props.setIsReset(false)
  }

  const prevMonth = () => {
    props.setMonthDiff(props.monthDiff - 1)
  }
  const nextMonth = () => {
    props.setMonthDiff(props.monthDiff + 1)
  }
  useEffect(() => {
    if (props.isReset) {
      props.setSelectDayjs(nowDate())
      props.setMonthDiff(0)
    }
    const baseList = culcBaseList(nowDate().add(props.monthDiff, 'month'))
    setList(JSON.parse(JSON.stringify(baseList)))
    props.setIsReset(false)
  }, [props.monthDiff, props.isReset, props.book])

  return (
    <div>
      <div>
        {targetYYYYMM(props.monthDiff)}
        <div className="grid h-[420px] w-full grid-cols-7 gap-4 xl:h-[450px] xl:w-8/12">
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
        className=" mt-4 h-16 w-full bg-custom-blue p-2 text-white xl:w-8/12"
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
