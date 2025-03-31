import express from 'express'
import cors from 'cors'
import { authRoutes, shoppingItemRoutes, user } from './routes'
import { MongoClient } from './database/mongo'
import { config } from 'dotenv'

const server = async () => {
  config()
  const port = process.env.PORT || 3333
  await MongoClient.connect()
  const httpServer = express()
  httpServer.use(cors())
  httpServer.use(express.json())
  httpServer.use(authRoutes)
  httpServer.use(shoppingItemRoutes)
  httpServer.use(user)
  httpServer.listen(port, () => console.log(`listening on port ${port}!`))
}

server()

