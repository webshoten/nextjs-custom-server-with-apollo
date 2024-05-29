"use client"

import { useEffect,useState } from 'react'
import client from '../../lib/client'
import { UserQuery,UserDocument} from '../../graphql/generated/graphql'
import {graphql,DocumentType} from  '../../graphql/generated/gql'

export function FB_RCC() {
  return (
    <div>
      <p>loading...</p>
    </div>
  )
}

type Props = {
  sub: string
}

export function RCC(props:Props) {
  const [user, setUser] = useState({}); 

  const handle = async () => {
    const { data: queryData, errors } = await client.query<UserQuery>({
      query: UserDocument,
      variables: { input: { sub:props.sub } } ,
    })
    setUser(queryData) 
  }

  handle()

   return (
    <div>
      <p>{user?.getUser?.name}の予約を開始します</p>
    </div>
  )
}
