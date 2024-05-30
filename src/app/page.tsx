'use client'

import { HoCAuth } from './components/auth/HoCAuth'
import Layout from './components/Layout'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export default HoCAuth(function Home(props: Props) {
  return (
    <>
      <Layout {...props}>
        <main className="col-span-4 grid gap-4 p-4 md:col-span-8">
          <p>よやくです詳細をみるにはクリックしてください。</p>
          <div className="grid grid-cols-2 gap-1 text-white sm:grid-cols-4">
            <div className="bg-slate-800 p-4 text-center">One</div>
            <div className="bg-slate-800 p-4 text-center">Two</div>
            <div className="bg-slate-800 p-4 text-center">Three</div>
            <div className="bg-slate-800 p-4 text-center">Four</div>
            <div className="bg-slate-800 p-4 text-center">Five</div>
            <div className="bg-slate-800 p-4 text-center">Six</div>
            <div className="bg-slate-800 p-4 text-center">Seven</div>
          </div>
        </main>
      </Layout>
    </>
  )
})
