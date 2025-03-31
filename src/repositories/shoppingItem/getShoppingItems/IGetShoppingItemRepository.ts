import { ShoppingItem } from '@/entities/ShoppingItem'

export interface IGetShoppingItemRepository {
  get(idItemName: string): Promise<ShoppingItem>
  getAll(): Promise<ShoppingItem[]>
}
