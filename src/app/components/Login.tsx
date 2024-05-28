import { GoogleLogin } from '@react-oauth/google';
import { Dispatch, SetStateAction } from "react";
import { GoogleLoginMutation,GoogleLoginDocument,GoogleLoginMutationVariables } from '../../graphql/generated/graphql'
import client from '../../lib/client'
export function Login(props:{ setUser: Dispatch<SetStateAction<GoogleLoginMutation>> }) {
 
    return (
        <GoogleLogin
            onSuccess={ async credentialResponse => {
                const input: GoogleLoginMutationVariables = {
                input: { 
                    idToken:credentialResponse.credential
                 },
                }
                const { data: queryData, errors } = await client.mutate<GoogleLoginMutation>(
                    {
                        mutation: GoogleLoginDocument,
                        variables: { ...input },
                    }
                )
                if(queryData){
                    props.setUser({...queryData})
                }
                debugger
            }}
            onError={() => {
            console.log('Login Failed');
            }} 
        />
    )
}