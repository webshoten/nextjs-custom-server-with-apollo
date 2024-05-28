import { getRscClient } from '../../lib/rscClient'
import { UserQuery,UserDocument,UserQueryVariables } from '../../graphql/generated/graphql'

export function FB_RSC() {
  return (
    <div>
      <p>loading...</p>
    </div>
  )
}

export async function RSC() {
  try {
    const { data: queryData, error } = await getRscClient().query<UserQuery>({
      query: UserDocument,
      variables: { input: { userId:2 } } ,
    })

    if (error) {
      return <>error</>
    }

    debugger

    return (
      <div>
        <p>{JSON.stringify(queryData.getUser)}</p>
      </div>
    )
  } catch (error) {
    /** build時にfetch error **/
    return <>error</>
  }
}
