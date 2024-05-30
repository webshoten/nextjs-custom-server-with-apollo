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
      <Layout {...props}>tttxxx</Layout>
    </>
  )
})
