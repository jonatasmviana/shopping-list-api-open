import { CreateShoppingItemUseCase } from './CreateShoppingItemUseCase'
import { IController } from '@/useCases/IController'
import { HttpRequest, HttpResponse } from '@/useCases/protocols'
import { ICreateShoppingItemRequestDTO } from './CreateShoppingItemDTO'
import { created, serverError } from '@/useCases/responses'
import { ShoppingItem } from '@/entities/ShoppingItem'

export class CreateShoppingItemController implements IController {
  constructor(private createShoppingItemUseCase: CreateShoppingItemUseCase) {}

  async handle(
    request: HttpRequest<ICreateShoppingItemRequestDTO>,
  ): Promise<HttpResponse<ShoppingItem | string>> {
    try {
      const shoppingItem = await this.createShoppingItemUseCase.execute(
        request.body,
      )
      return created<ShoppingItem>(shoppingItem)
    } catch (error) {
      return serverError(error.message)
    }
  }

  private async getById() {
    return null
  }
}
