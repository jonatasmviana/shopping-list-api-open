import { ShoppingItem } from '@/entities/ShoppingItem'
import { IGetShoppingItemRepository } from '@/repositories/shoppingItem/getShoppingItems/IGetShoppingItemRepository'

export class GetShoppingItemsUseCase {
  constructor(private getShoppingItemRepository: IGetShoppingItemRepository) {}

  async get(idItemName: string): Promise<ShoppingItem> {
    return await this.getShoppingItemRepository.get(idItemName)
  }

  async getAll() {
    return await this.getShoppingItemRepository.getAll()
  }

  // async execute(data: ICreateShoppingItemRequestDTO) {
  //   return await this.getShoppingItemRepository.getAll()
  // }
}
