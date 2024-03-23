import { setTimeout } from 'timers/promises'
import { getClient } from '../../lib/client'
import { TodoQuery, TodoDocument } from '../../graphql/generated/graphql'

export async function ServerComponent() {
  // クエリ
  const { data: queryData } = await getClient().query<TodoQuery>({
    query: TodoDocument,
  })

  const boxStyle = {
    width: '400px',
    height: '300px',
    backgroundColor: '#006400',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const textStyle = { color: 'white', footSize: 'larger', fontWeight: 'bold' }
  console.log('Server Componentを実行しています')

  return (
    <div style={boxStyle}>
      <p style={textStyle}>{queryData.getTodo?.title}</p>
    </div>
  )
}
