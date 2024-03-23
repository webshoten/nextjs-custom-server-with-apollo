import { RSC, FB_RSC } from './components/RSC'
import React, { Suspense } from 'react'

export default async function Home() {
  console.log('test')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Suspense fallback={<FB_RSC />}>
          <RSC />
        </Suspense>
        <Suspense fallback={<FB_RSC />}>
          <RSC />
        </Suspense>
      </div>
    </main>
  )
}
