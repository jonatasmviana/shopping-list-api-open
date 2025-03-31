import { MongoCreateShoppingItemRepository } from '@/repositories/shoppingItem/createShoppingItem/MongoCreateShoppingItemRepository'
import { CreateShoppingItemController } from './CreateShoppingItemController'
import { CreateShoppingItemUseCase } from './CreateShoppingItemUseCase'

const mongoCreateShoppingItemRepository =
  new MongoCreateShoppingItemRepository()

const createShoppingItemUseCase = new CreateShoppingItemUseCase(
  mongoCreateShoppingItemRepository,
)

const createShoppingItemController = new CreateShoppingItemController(
  createShoppingItemUseCase,
)

export { createShoppingItemUseCase, createShoppingItemController }
