import { ServerComponent } from './components/sc'
import React, { Suspense } from 'react'

export default async function Home() {
  console.log('test')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        Hello World
        <Suspense fallback={<div>Loading...</div>}>
          <ServerComponent />
        </Suspense>
      </div>
    </main>
  )
}
