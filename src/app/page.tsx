'use client'

import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'
import { useState } from 'react'
import { HoCAuth } from './components/HoCAuth'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export default HoCAuth(function Home(props: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Navbar onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar />
    </>
  )
})
