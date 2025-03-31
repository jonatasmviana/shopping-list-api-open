import { MongoClient as Mongo, Db } from 'mongodb'

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL
    const cluster = process.env.MONGODB_CLUSTER
    const username = process.env.MONGODB_USERNAME
    const password = process.env.MONGODB_PASSWORD
    const uri = url
      .concat(username)
      .concat(':')
      .concat(password)
      .concat(cluster)

    const client = new Mongo(uri)
    const db = client.db(process.env.MONGODB_DATA_BASE)

    this.client = client
    this.db = db

    console.log('connected to mongodb!')
  },
}
