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

  const boxStyle = (box: boxProps) => {
    const boxH = box.h
    const selectH = props.selectH
    if (box.isTarget && !selectH.includes(boxH)) {
      return 'bg-slate-800 text-white'
    } else if (box.isTarget && selectH.includes(boxH)) {
      return 'bg-orange-400 text-black'
    } else {
      return 'bg-gray-50 text-black'
    }
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
