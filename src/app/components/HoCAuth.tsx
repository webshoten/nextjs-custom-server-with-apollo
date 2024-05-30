import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { IsAuthByIdTokenQuery } from '../../graphql/generated/graphql'
import { IsAuthByIdTokenDocument } from '../../graphql/generated/graphql'
import { getRscClient } from '../../lib/rscClient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any

type ElementInterface = Promise<React.JSX.Element> | React.JSX.Element

/**
 * High Order Component
 * @param WrapedComponent
 * @returns
 */
export const HoCAuth = (
  WrapedComponent: (props: Props) => ElementInterface,
) => {
  const withAuth = async (props: Props) => {
    const idToken = cookies().get('idToken')?.value

    const {
      data: queryData,
      errors,
      loading,
    } = await getRscClient().query<IsAuthByIdTokenQuery>({
      query: IsAuthByIdTokenDocument,
      variables: { input: { idToken } },
    })

    if (queryData.isAuthByIdToken) {
      return <WrapedComponent {...props} />
    } else {
      redirect(`/login`)
    }
  }

  return withAuth
}
