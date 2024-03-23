import { setTimeout } from 'timers/promises'
import { getClient } from '../../lib/client'
import { TodoQuery, TodoDocument } from '../../graphql/generated/graphql'

export function FB_RSC() {
  const boxStyle = {
    width: '400px',
    height: '300px',
    backgroundColor: '#636363',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5px',
  }
  const textStyle = { color: 'white', footSize: 'larger', fontWeight: 'bold' }

  return (
    <div style={boxStyle}>
      <p style={textStyle}>loading...</p>
    </div>
  )
}

export async function RSC() {
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
    margin: '5px',
  }
  const textStyle = { color: 'white', footSize: 'larger', fontWeight: 'bold' }
  console.log('Server Componentを実行しています')

  return (
    <div style={boxStyle}>
      <p style={textStyle}>{queryData.getTodo?.title}</p>
    </div>
  )
}
