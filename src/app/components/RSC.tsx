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

 try {
   await getClient().query<TodoQuery>({
     query: TodoDocument,
   })
 } catch (error) {
   return <>error</>
 }

  // クエリ
  const { data: queryData, error } = await getClient().query<TodoQuery>({
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

  if (error) {
    return <>error</>
  }

  return (
    <div style={boxStyle}>
      <p style={textStyle}>{queryData.getTodo?.title}</p>
    </div>
  )
}
