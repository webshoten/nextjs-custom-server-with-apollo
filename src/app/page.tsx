import React, {useState} from 'react'
import Link from 'next/link'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {GoogleLoginWrapper} from './components/GoogleLoginWrapper'
import { GoogleLoginMutation } from '../graphql/generated/graphql'
import {HoCAuth} from './components/HoCAuth'
import { googleLogout } from '@react-oauth/google';

type Props = {
  params : {[key:string]:string} ,
  searchParams: {[key:string]:string }
}

export default HoCAuth(function Home(props:Props) {
  return (
    <main>
      <div className="grid min-h-screen w-screen place-items-center bg-gray-400">
        <Link
          type="button"
          href={`/book?sub=${props?.searchParams?.sub}`}
          className="border bg-white text-gray-900"
        >
          Bookへ
        </Link>
      </div>
    </main>
  )
})
