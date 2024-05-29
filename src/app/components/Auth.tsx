import React from 'react'
import {cookies} from "next/headers";
import { IsAuthByIdTokenQuery,IsAuthByIdTokenDocument } from '../../graphql/generated/graphql'
import {getRscClient} from '../../lib/rscClient'
import { redirect } from "next/navigation";

export const Auth = (WrapedComponent:any) => {
    const withAuth:any = async (props:any) => {
        const idToken = cookies().get("idToken")?.value
     
        const { data: queryData, errors,loading } = await getRscClient().query<IsAuthByIdTokenQuery>(
            {
                query: IsAuthByIdTokenDocument,
                variables:{ input: { idToken: idToken } }
            },
        )
        if(queryData.isAuthByIdToken){
            return (<WrapedComponent {...props}/>)
        }else{
            redirect(`/`);
        }
    }

    return withAuth
}