import { RegisterRepositoryTypeEnum } from '@/repositories/auth/register/RegisterRepositoryTypeEnum'
import { HttpRequest, HttpResponse } from './protocols'

export interface IController {
  handle(
    request?: HttpRequest<unknown>,
    response?: HttpResponse<unknown>,
  ): Promise<HttpResponse<unknown>>
}

export interface IAuthController {
  handle(
    type?: RegisterRepositoryTypeEnum,
    request?: HttpRequest<unknown>,
    response?: HttpResponse<unknown>,
  ): Promise<HttpResponse<unknown>>,
}
