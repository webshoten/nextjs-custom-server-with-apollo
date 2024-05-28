'use client'

// import { useEffect, useRef, useState } from 'react'
// import client from '../../lib/client'

// import {
//   CreateTodoMutation,
//   CreateTodoDocument,
//   CreateTodoMutationVariables,
// } from '../../graphql/generated/graphql'

// export function RCC() {
//   const myRef = useRef<HTMLTextAreaElement>(null)
//   const [val, setVal] = useState('')
//   const [rows, setRows] = useState(1)
//   const handleChange = (e: any) => {
//     setVal(e.target.value)
//   }

//   const handleClick = async () => {
//     debugger
//     const input: CreateTodoMutationVariables = {
//       input: { content: val, title: 'xxx' },
//     }
//     const { data: queryData, errors } = await client.mutate<CreateTodoMutation>(
//       {
//         mutation: CreateTodoDocument,
//         variables: { ...input },
//       }
//     )

//     console.log('end')
//   }

//   useEffect(() => {
//     if (myRef.current) {
//       console.log(myRef.current.value)
//       let obj = myRef.current.value.match(/\n/g)
//       setRows(obj === null ? 1 : obj.length + 1)
//     }
//   }, [val])

//   return (
//     <div className="w-screen min-h-screen grid place-items-center bg-gray-400">
//       <div className=" w-[30rem] rounded flex flex-col">
//         <button onClick={handleClick} className=" bg-white">
//           send
//         </button>
//         <textarea
//           className="resize-none focus:outline-none font-bold rounded-sm overflow-y-hidden"
//           rows={rows}
//           placeholder="Your message"
//           value={val}
//           onChange={handleChange}
//           ref={myRef}
//         ></textarea>
//       </div>
//     </div>
//   )
// }
