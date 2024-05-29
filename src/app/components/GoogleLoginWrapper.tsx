import { GoogleLogin } from '@react-oauth/google';
import { Dispatch, SetStateAction } from "react";
import { GoogleLoginMutation,GoogleLoginDocument } from '../../graphql/generated/graphql'
import client from '../../lib/client'
export function GoogleLoginWrapper(props:{ setUser: Dispatch<SetStateAction<GoogleLoginMutation>> }) {
 
    return (
        <GoogleLogin
            onSuccess={ async credentialResponse => {

                const { data: queryData, errors } = await client.mutate<GoogleLoginMutation>(
                    {
                        mutation: GoogleLoginDocument,
                        variables:{ input: { idToken: credentialResponse.credential } }
                    },
                )
                if(queryData){
                    props.setUser({...queryData})
                }
            }}
            onError={() => {
            console.log('Login Failed');
            }} 
        />
    )
}