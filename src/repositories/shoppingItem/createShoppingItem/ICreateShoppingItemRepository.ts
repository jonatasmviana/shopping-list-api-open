import { ShoppingItem } from '@/entities/ShoppingItem'

export interface ICreateShoppingItemRepository {
  save(shoppingItem: ShoppingItem): Promise<ShoppingItem>
}
