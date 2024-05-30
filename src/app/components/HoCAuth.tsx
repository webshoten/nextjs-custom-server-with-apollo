import React from 'react'
import {cookies} from "next/headers";
import type { IsAuthByIdTokenQuery } from '../../graphql/generated/graphql'
import { IsAuthByIdTokenDocument } from '../../graphql/generated/graphql'
import {getRscClient} from '../../lib/rscClient'
import { redirect } from "next/navigation";

/**
 * High Order Component
 * @param WrapedComponent 
 * @returns 
 */
export const HoCAuth = (WrapedComponent: any) => {
    const withAuth:any = async (props:any) => {
        const idToken = cookies().get("idToken")?.value
     
        const {
          data: queryData,
          errors,
          loading,
        } = await getRscClient().query<IsAuthByIdTokenQuery>({
          query: IsAuthByIdTokenDocument,
          variables: { input: { idToken } },
        })

        if(queryData.isAuthByIdToken){
            return (<WrapedComponent {...props}/>)
        }else{
            redirect(`/login`);
        }
    }

    return withAuth
}