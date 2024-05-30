'use client'

import { GetAuthSubByCookieDocument } from '@/graphql/generated/graphql'
import { useQuery } from '@apollo/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}

const IsAuth = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const sub = searchParams.get('sub')
  const pathname = usePathname()

  const { data, error, loading } = useQuery(GetAuthSubByCookieDocument, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (data && data?.getAuthSubByCookie) {
      if (!sub) router.push(pathname + '?' + 'sub=' + data?.getAuthSubByCookie)
      setIsAuth(true)
    }
    if (data && !data?.getAuthSubByCookie) {
      router.push('/login')
    }
  }, [data])

  return (
    <>
      {loading && (
        <>
          <div className="my-20 flex justify-center">
            <div className="size-72 animate-spin rounded-xl bg-custom-blue"></div>
          </div>
        </>
      )}
      {error && <>error</>}
      {isAuth && children}
    </>
  )
}

export default IsAuth
