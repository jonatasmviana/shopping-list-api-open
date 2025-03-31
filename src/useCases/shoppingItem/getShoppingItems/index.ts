import { MongoGetShoppingItemsRepository } from '@/repositories/shoppingItem/getShoppingItems/MongoGetShoppingItemsRepository'
import { GetShoppingItemsUseCase } from './GetShoppingItemsUseCase'
import { GetShoppingItemController } from './GetShoppingItemsController'

const mongoGetShoppingItemsRepository = new MongoGetShoppingItemsRepository()

const getShoppingItemsUseCase = new GetShoppingItemsUseCase(
  mongoGetShoppingItemsRepository,
)

const getShoppingItemController = new GetShoppingItemController(
  getShoppingItemsUseCase,
)

export { getShoppingItemsUseCase, getShoppingItemController }
