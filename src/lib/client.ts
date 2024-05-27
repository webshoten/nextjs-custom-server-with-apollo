import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { headers } from 'next/headers';

const appolloClient =  new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri:  `/graphql`, // 各自の環境で書き換えてください
    fetchOptions: { cache: 'no-store' }, // 一旦、キャッシュしない設定で逃げる
  }),
})

export default appolloClient
