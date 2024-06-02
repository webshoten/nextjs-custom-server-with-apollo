import type { BookProps } from '@/app/book/page'
import { useSearchParams } from 'next/navigation'
import { useEffect, type Dispatch, type SetStateAction } from 'react'

type boxProps = {
  h: number
  isTarget: boolean
}

type Props = {
  selectH: number[]
  setSelectH: Dispatch<SetStateAction<number[]>>
  isReset: boolean
  setIsReset: Dispatch<SetStateAction<boolean>>
  time?: BookProps[]
}

function Time(props: Props) {
  const list: boxProps[] = [
    { h: 6, isTarget: true },
    { h: 7, isTarget: true },
    { h: 8, isTarget: true },
    { h: 9, isTarget: true },
    { h: 10, isTarget: true },
    { h: 11, isTarget: true },
    { h: 12, isTarget: true },
    { h: 13, isTarget: true },
    { h: 14, isTarget: true },
    { h: 15, isTarget: true },
    { h: 16, isTarget: true },
    { h: 17, isTarget: true },
    { h: 18, isTarget: true },
    { h: 19, isTarget: true },
    { h: 20, isTarget: true },
    { h: 21, isTarget: true },
    { h: 22, isTarget: true },
    { h: 23, isTarget: true },
    { h: 24, isTarget: true },
  ]
  const searchParams = useSearchParams()
  const sub = searchParams.get('sub')

  const boxStyle = (box: boxProps) => {
    const boxH = box.h
    const selectH = props.selectH
    const isTarget = box.isTarget
    const isSelect = selectH.includes(boxH)
    const isMe =
      props?.time?.filter((t) => {
        return t?.time === boxH && t?.subOnlyMe === sub
      }) &&
      props?.time?.filter((t) => {
        return t?.time === boxH && t?.subOnlyMe === sub
      })?.length > 0
    const isSomeone =
      props?.time?.filter((t) => {
        return t?.time === boxH && t?.subOnlyMe === '*'
      }) &&
      props?.time?.filter((t) => {
        return t?.time === boxH && t?.subOnlyMe === '*'
      })?.length > 0

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
    const h = JSON.parse(e.currentTarget.value) as number
    const harray = props.selectH
    if (props.selectH.includes(h)) {
      //削除
      props.setSelectH([...harray.filter((hh) => hh !== h)])
    } else {
      //追加
      props.setSelectH([...harray, h])
    }
    props.setIsReset(false)
  }

  useEffect(() => {
    if (props.isReset) props.setSelectH([])
    props.setIsReset(false)
  }, [props.isReset])

  return (
    <div>
      <div>
        test
        <div className="grid h-[230px] w-full grid-cols-7 gap-4 xl:h-[350px] xl:w-8/12">
          {list.map((box, key) => (
            <button
              key={key}
              value={box.h}
              className={boxStyle(box)}
              onClick={box.isTarget ? selectBox : undefined}
            >
              {box.h}時
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Time
