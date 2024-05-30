'use client'

import { IsAuthByCookieDocument } from '@/graphql/generated/graphql'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}

const IsAuth = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()
  const { data, error, loading } = useQuery(IsAuthByCookieDocument, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    console.log(data)
    if (data && data?.isAuthByCookie) setIsAuth(true)
    if (data && !data?.isAuthByCookie) router.push('/login')
  }, [data])

  return (
    <>
      {loading && <>loading</>}
      {error && <>error</>}
      {isAuth && children}
    </>
  )
}

export default IsAuth
