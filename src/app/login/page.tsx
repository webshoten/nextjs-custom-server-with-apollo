'use client'
import React, {useState,useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLoginWrapper } from '../components/auth/GoogleLoginWrapper'
import type {
  GoogleLoginMutation,
  GoogleLogoutMutation,
} from '../../graphql/generated/graphql'
import { GoogleLogoutDocument } from '../../graphql/generated/graphql'
import client from '../../lib/client'

type Props = {
    params : {[key:string]:string} ,
    searchParams: {[key:string]:string }
}

export default function Login(props:Props) {
  const router = useRouter();
  const [user, setUser] = useState<GoogleLoginMutation>({});

  const logout = async () => {
    const { data: queryData, errors } = await client.mutate<GoogleLogoutMutation>(
        {
            mutation: GoogleLogoutDocument,
        },
    )
    return queryData
  }

  useEffect(() => {
    console.log(props)
    if (Object.keys(user).length !== 0) {
      router.push(`/?sub=${user?.googleLogin?.sub}`)
    } else {
      logout().then((data) => {
        console.log(data)
        router.replace('/login')
      })
    }
  }, [user])

  return (
    <main>
      <div className="grid min-h-screen w-screen place-items-center bg-gray-400">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
        >
          <GoogleLoginWrapper setUser={setUser} />
        </GoogleOAuthProvider>
      </div>
    </main>
  )
}
