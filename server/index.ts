import express, { Request, Response } from 'express'
import next from 'next'
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4'

import 'dotenv/config'
import { db } from './db'
import GraphQL from './graphql'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const port = process.env.PORT || 3001

async function main() {
  const graphQl = new GraphQL(db)
  await graphQl.apolloServer.start()
  try {
    await nextApp.prepare()
    const app = express()

    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(graphQl.apolloServer)
    )

    app.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    app.listen(port, (err?: any) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
