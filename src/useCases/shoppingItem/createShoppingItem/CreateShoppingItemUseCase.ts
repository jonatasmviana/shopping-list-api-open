import { ShoppingItem } from '@/entities/ShoppingItem'
import { ICreateShoppingItemRepository } from '@/repositories/shoppingItem/createShoppingItem/ICreateShoppingItemRepository'
import { ICreateShoppingItemRequestDTO } from './CreateShoppingItemDTO'

export class CreateShoppingItemUseCase {
  constructor(
    private createShoppingItemRepository: ICreateShoppingItemRepository,
  ) {}

  async execute(data: ICreateShoppingItemRequestDTO) {
    // const itemAlreadyExists = await this.getShoppingItemRepository.get(data.shoppingItem)

    // if (itemAlreadyExists) {
    //   throw new Error('Item already exists.');
    // }

    const shoppingItem = new ShoppingItem(data)
    return await this.createShoppingItemRepository.save(shoppingItem)
  }
}
