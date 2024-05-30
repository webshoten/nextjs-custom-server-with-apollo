'use client'

import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'
import { useEffect, useState } from 'react'
import { HoCAuth } from './components/auth/HoCAuth'
import { UseWindowSize } from './hooks/UseWindowSize'

type Props = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export default HoCAuth(function Home(props: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { width } = UseWindowSize()
  console.log(width)

  useEffect(() => {
    if (width <= 640) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [width])

  return (
    <>
      <Navbar onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      {isSidebarOpen && <Sidebar />}
    </>
  )
})
