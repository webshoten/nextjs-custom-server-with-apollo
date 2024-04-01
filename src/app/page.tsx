import { RSC, FB_RSC } from './components/RSC'
import { RCC } from './components/RCC'
import React, { Suspense } from 'react'

export default async function Home() {
  return (
    <main>
      <div className="w-screen min-h-screen grid place-items-center bg-gray-400">
        <Suspense fallback={<FB_RSC />}>
          <RSC />
        </Suspense>
      </div>
      <div>
        <RCC />
      </div>
    </main>
  )
}
