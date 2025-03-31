import { MongoClient } from '@/database/mongo'
import { IGetShoppingItemRepository } from './IGetShoppingItemRepository'
import { ShoppingItem } from '@/entities/ShoppingItem'
import { ObjectId } from 'mongodb'

export class MongoGetShoppingItemsRepository
  implements IGetShoppingItemRepository
{
  async get(id: string): Promise<ShoppingItem> {
    const oid = new ObjectId(id)
    return await MongoClient.db
      .collection<ShoppingItem>('items')
      .findOne({ _id: oid })
  }

  async getAll(): Promise<ShoppingItem[]> {
    return await MongoClient.db
      .collection<ShoppingItem>('items')
      .find({})
      .toArray()

    // return items.map(({ id, ...rest }) => ({
    //   ...rest,
    //   id: id.toHexString(),
    // }));
  }
}
