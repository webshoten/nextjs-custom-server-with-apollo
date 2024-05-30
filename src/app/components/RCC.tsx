"use client"

import { useState } from 'react'
import client from '../../lib/client'
import type { UserQuery } from '../../graphql/generated/graphql'
import { UserDocument } from '../../graphql/generated/graphql'

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
  const [user, setUser] = useState<UserQuery>({}); 

  const handle = async () => {
    const { data: queryData, errors } = await client.query<UserQuery>({
      query: UserDocument,
      variables: { input: { sub:props.sub } } ,
    })
    return queryData
  }

  handle().then((data)=>{
    setUser(data) 
  })

  return (
    <div>
      {Object.keys(user).length !== 0 ? <p>{user?.getUser?.name}の予約を開始します</p> : <>Loading...</>}
    </div>
  )
}
