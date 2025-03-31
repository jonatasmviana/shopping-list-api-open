import { IGetUsersRepository } from './IGetUsersRepository'
import { MongoClient } from '@/database/mongo'
import { ObjectId } from 'mongodb'
import { User } from '@/entities/User'

export class MongoGetUsersRepository implements IGetUsersRepository {
  async get(id: string): Promise<User> {
    const oid = toObjectId(id)
    return await MongoClient.db.collection<User>('users').findOne({ _id: oid })
  }

  async getByEmail(email: string): Promise<User> {
    return await MongoClient.db
      .collection<User>('users')
      .findOne({ email: email })
  }

  async getAll(): Promise<User[]> {
    return await MongoClient.db.collection<User>('users').find({}).toArray()

    // return items.map(({ id, ...rest }) => ({
    //   ...rest,
    //   id: id.toHexString(),
    // }));
  }
}

export function toObjectId(id: string): ObjectId {
  return new ObjectId(id);
}