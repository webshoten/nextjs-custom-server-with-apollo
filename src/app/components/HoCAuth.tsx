'use client'

import IsAuth from '@/app/components/IsAuth'
import { ApolloProvider } from '@apollo/client'
import client from '../../lib/client'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any

/**
 * High Order Component
 * @param WrapedComponent
 * @returns
 */
export const HoCAuth = (
  WrapedComponent: (props: Props) => React.JSX.Element,
) => {
  const withAuth = (props: Props) => {
    return (
      <ApolloProvider client={client}>
        <IsAuth>
          <WrapedComponent {...props} />
        </IsAuth>
      </ApolloProvider>
    )
  }

  return withAuth
}
