import { ICreateShoppingItemRepository } from './ICreateShoppingItemRepository'
import { ShoppingItem } from '@/entities/ShoppingItem'
import { MongoClient } from '@/database/mongo'

export class MongoCreateShoppingItemRepository
  implements ICreateShoppingItemRepository
{
  async save(params: ShoppingItem): Promise<ShoppingItem> {
    const { insertedId } = await MongoClient.db
      .collection('items')
      .insertOne(params)

    const shoppingItem = await MongoClient.db
      .collection<ShoppingItem>('items')
      .findOne({ _id: insertedId })

    if (!shoppingItem) {
      throw new Error('Item not created')
    }

    const { _id, ...rest } = shoppingItem

    return { id: _id.toHexString(), ...rest }
  }
}
