'use client'

import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { UseWindowSize } from '../hooks/UseWindowSize'

interface Props {
  children: ReactNode
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}

export default function Layout(props: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const { width } = UseWindowSize()

  useEffect(() => {
    if (width <= 640) {
      setIsSidebarOpen(false)
      setIsMobile(true)
    } else {
      setIsSidebarOpen(true)
      setIsMobile(false)
    }
  }, [width])

  return (
    <>
      {isMobile && <Navbar onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />}
      {isSidebarOpen && (
        <Sidebar
          {...{ params: props.params, searchParams: props.searchParams }}
        />
      )}
      <div className="sm:ml-64">{props.children}</div>
    </>
  )
}
