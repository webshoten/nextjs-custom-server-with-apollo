import { GoogleLogin } from '@react-oauth/google';
import { Dispatch, SetStateAction } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { GoogleLoginMutation,GoogleLoginDocument } from '../../graphql/generated/graphql'
import client from '../../lib/client'
export function Login(props:{ setUser: Dispatch<SetStateAction<GoogleLoginMutation>> }) {
 
    return (
        <GoogleLogin
            onSuccess={ async credentialResponse => {

                // Parse
                const cookies = parseCookies()
                console.log({ cookies })

                const options = {
                    maxAge: 60 * 60,
                    secure: true,
                    path: '/',
                }
            
                if (credentialResponse.credential) setCookie(null, 'idToken', credentialResponse.credential, options);       

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