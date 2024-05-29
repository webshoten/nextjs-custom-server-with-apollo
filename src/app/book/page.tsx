import { RCC } from '../components/RCC'
import React from 'react'
import {HoCAuth} from '../components/HoCAuth'

export default HoCAuth(async function Book(props:any) {
  return (
    <main>
      <div className="w-screen min-h-screen grid place-items-center bg-gray-400">
          <RCC sub={props?.searchParams?.sub}/>
      </div>
    </main>
  )
})
