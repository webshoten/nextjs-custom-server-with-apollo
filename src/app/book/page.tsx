import { RCC, FB_RCC } from '../components/RCC'
import React, { Suspense } from 'react'
import {Auth} from '../components/Auth'
import { useSearchParams } from "next/navigation";

export default Auth(async function Book(props:any) {
  return (
    <main>
      <div className="w-screen min-h-screen grid place-items-center bg-gray-400">
          <RCC sub={props?.searchParams?.sub}/>
      </div>
    </main>
  )
})
