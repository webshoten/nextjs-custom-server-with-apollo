import { RSC, FB_RSC } from './components/RSC'
import React, { Suspense } from 'react'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>
        <Suspense fallback={<FB_RSC />}>
          <RSC />
        </Suspense>
      </div>
    </main>
  )
}
