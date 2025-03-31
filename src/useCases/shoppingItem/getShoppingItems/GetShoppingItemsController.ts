import { GetShoppingItemsUseCase } from './GetShoppingItemsUseCase'
import { IController } from '@/useCases/IController'
import { HttpRequest, HttpResponse } from '@/useCases/protocols'
import { ok, serverError } from '@/useCases/responses'
import { ShoppingItem } from '@/entities/ShoppingItem'
import { IGetShoppingItemsRequestDTO } from './GetShoppingItemsDTO'

export class GetShoppingItemController implements IController {
  constructor(private getShoppingItemsUseCase: GetShoppingItemsUseCase) {}

  async handle(
    request?: HttpRequest<IGetShoppingItemsRequestDTO>,
  ): Promise<HttpResponse<ShoppingItem[] | ShoppingItem | string>> {
    try {
      const idItemName = request?.body?.idItemName
      const shoppingItem = idItemName
        ? await this.getShoppingItemsUseCase.get(idItemName)
        : await this.getShoppingItemsUseCase.getAll()

      return ok<ShoppingItem>(shoppingItem)
    } catch (error) {
      return serverError(error.message)
    }
  }
}
