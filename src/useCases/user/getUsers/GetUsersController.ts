import { IController } from '@/useCases/IController'
import { HttpRequest, HttpResponse } from '@/useCases/protocols'
import { ok, serverError } from '@/useCases/responses'
import { User } from '@/entities/User'
import { IGetUsersDTO } from './GetUsersDTO'
import { GetUsersUseCase } from './GetUsersUseCase'

export class GetUsersController implements IController {
  constructor(private getUsersUseCase: GetUsersUseCase) {}

  async handle(
    request?: HttpRequest<IGetUsersDTO>,
  ): Promise<HttpResponse<User[] | User | string>> {
    try {
      const id_user = request?.body?.id_user
      const user = id_user
        ? await this.getUsersUseCase.get(id_user)
        : await this.getUsersUseCase.getAll()

      return ok<User>(user)
    } catch (error) {
      return serverError(error.message)
    }
  }
}
