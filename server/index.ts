import express, { Request, Response } from 'express'
import next from 'next'
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4'
import 'dotenv/config'
import {OAuth2Client} from 'google-auth-library' 

import { db } from './db'
import GraphQL from './graphql'
const oauth2 = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const port = process.env.PORT || 8080

async function main() {
  const graphQl = new GraphQL(db,oauth2)
  await graphQl.apolloServer.start()
  try {
    await nextApp.prepare()
    const app = express()

    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      express.json(),
      expressMiddleware(graphQl.apolloServer,
        {
          context: async ({req:Request,res:Response}) => {
            return {
              req:Request,
              res:Response,
            }
          },
        }
      )
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
