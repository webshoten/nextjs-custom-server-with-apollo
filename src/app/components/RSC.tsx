import { getClient } from '../../lib/client'
import { TodoQuery, TodoDocument } from '../../graphql/generated/graphql'

export function FB_RSC() {
  return (
    <div>
      <p>loading...</p>
    </div>
  )
}

export async function RSC() {
  try {
    const { data: queryData, error } = await getClient().query<TodoQuery>({
      query: TodoDocument,
      variables: { input: { id: 1 } },
    })

    console.log('Server Componentを実行しています')

    if (error) {
      return <>error</>
    }

    return (
      <div>
        <p>{queryData.getTodo?.title}</p>
      </div>
    )
  } catch (error) {
    /** build時にfetch error **/
    return <>error</>
  }
}
