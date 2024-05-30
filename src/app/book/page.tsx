'use client'

import { HoCAuth } from '../components/auth/HoCAuth'
import { RCC } from '../components/RCC'
import Layout from '../components/Layout'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export default HoCAuth(function Book(props: Props) {
  return (
    <Layout {...props}>
      <div className="grid min-h-screen w-screen bg-gray-400 p-16">
        <RCC sub={props?.searchParams?.sub} />
      </div>
    </Layout>
  )
})
