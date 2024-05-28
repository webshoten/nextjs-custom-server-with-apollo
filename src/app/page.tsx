import { RSC, FB_RSC } from './components/RSC'
import React, { Suspense } from 'react'

export default async function Home() {
  return (
    <main>
      <div className="w-screen min-h-screen grid place-items-center bg-gray-400">
        <Suspense fallback={<FB_RSC />}>
          <RSC />
        </Suspense>
      </div>
    </main>
  )
}
