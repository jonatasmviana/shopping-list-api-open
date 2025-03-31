import { IAuthRepository } from './IRegisterRepository'
import { MongoClient } from '@/database/mongo'
import { User } from '@/entities/User'
import { ObjectId } from 'mongodb';

export class MongoRegisterRepository implements IAuthRepository {
  async register(params: User): Promise<Omit<User, 'password'>> {

    const userInsert = {
      ...params,
      _id: new ObjectId(params._id),
    }

    const { insertedId } = await MongoClient.db
      .collection('users')
      .insertOne(userInsert)

    const user = await MongoClient.db
      .collection<User>('users')
      .findOne({ _id: insertedId })

    if (!user) {
      throw new Error('User not created')
    }

    const { _id, name, email } = user

    return { _id, name, email }
  }

  async login(id: string, refreshToken: string): Promise<void> {
    await MongoClient.db.collection('userRefreshTokens').insertOne({
      id,
      refreshToken,
    })
  }

  async logout(id: string, accessToken: string): Promise<void> {
    await MongoClient.db.collection('userRefreshTokens').deleteMany({ id })
    await MongoClient.db.collection('userInvalidTokens').insertOne({
      id,
      accessToken,
    })
  }

  async refreshToken(refreshToken: string): Promise<void> {
    await MongoClient.db
      .collection('userRefreshTokens')
      .deleteMany({ refreshToken })
  }

  async getInvalidAccessToken(accessToken: string): Promise<string | null> {
    const user = await MongoClient.db
      .collection('userInvalidTokens')
      .findOne({ accessToken })

    return !!user ? user.id : null;
  }

  async getRefreshToken(userId: string, refreshToken: string): Promise<string> {
    const { id } = await MongoClient.db
      .collection('userRefreshTokens')
      .findOne({ refreshToken, userId })

    return id
  }
}
