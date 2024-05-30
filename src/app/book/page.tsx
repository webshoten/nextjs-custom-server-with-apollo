import { RCC } from '../components/RCC'
import React from 'react'
import {HoCAuth} from '../components/HoCAuth'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export default HoCAuth(async function Book(props: Props) {
  return (
    <main>
      <div className="grid min-h-screen w-screen place-items-center bg-gray-400">
        <RCC sub={props?.searchParams?.sub} />
      </div>
    </main>
  )
})
