'use client'
import React, { Suspense,useState} from 'react'
import Link from 'next/link'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Login} from './components/Login'
import { GoogleLoginMutation } from '../graphql/generated/graphql'

export default function Home() {
  const [user, setUser] = useState<GoogleLoginMutation>({});

  return (
    <main>
      <div className="w-screen min-h-screen grid place-items-center bg-gray-400">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '' }>
          <Login setUser={setUser}/>
          <p>{user?.googleLogin?.email}</p>
          <Link href={`/book?sub=${user.googleLogin?.sub}`} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">book</Link>
        </GoogleOAuthProvider>;
      </div>
    </main>
  )
}
