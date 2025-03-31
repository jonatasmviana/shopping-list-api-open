import bcrypt from 'bcryptjs';
import { IAuthController } from '@/useCases/IController'
import { HttpRequest, HttpResponse } from '@/useCases/protocols'
import {
  conflict,
  noContent,
  ok,
  serverError,
  unauthorized,
  unprocessableEntity,
} from '@/useCases/responses'
import { AuthUseCase } from './AuthUseCase'
import { User } from '@/entities/User'
import { IAuthDTO } from './AuthDTO'
import jwt from 'jsonwebtoken'
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} from '@/useCases/configs'
import { GetUsersUseCase } from '@/useCases/user/getUsers/GetUsersUseCase'
import { RegisterRepositoryTypeEnum } from '@/repositories/auth/register/RegisterRepositoryTypeEnum'
import { HandleType, LoginType } from './AuthTypes'

export class AuthController implements IAuthController {
  constructor(
    private authUseCase: AuthUseCase,
    private getUsersUseCase: GetUsersUseCase,
  ) {}

  private async register(data: IAuthDTO): Promise<HttpResponse<User | string>> {
    try {
      const { name, email, password } = data

      if (!name || !email || !password) {
        return unprocessableEntity(
          'Please fill in all fields (name, email and password)',
        )
      }

      const userExists = await this.getUsersUseCase.getByEmail(email)

      if (userExists) {
        return conflict('User already exists')
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await this.authUseCase.register({
        ...data,
        password: hashedPassword,
      })

      return ok<User>(user)
    } catch (error) {
      return serverError(error.message)
    }
  }

  private async login(data: IAuthDTO): Promise<HttpResponse<LoginType>> {
    try {
      const { email, password } = data

      if (!email || !password) {
        return unprocessableEntity(
          'Please fill in all fields (email and password)',
        )
      }

      const user = await this.getUsersUseCase.getByEmail(email)
      const message = 'Email or password is invalid'

      if (!user) {
        return unauthorized(message)
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return unauthorized(message)
      }

      const accessToken = jwt.sign(
        { id: user._id, sub: 'accessApi' },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
      )

      const refreshToken = jwt.sign(
        { id: user._id, sub: 'refreshToken' },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
      )

      await this.authUseCase.login({
        _id: user._id.toString(),
        refreshToken,
      })

      const authUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
      }

      return ok<Omit<IAuthDTO, 'password'>>(authUser)
    } catch (error) {
      return serverError(error.message)
    }
  }

  private async logout(data: IAuthDTO): Promise<HttpResponse<void | string>> {
    try {
      await this.authUseCase.logout(data._id, data.accessToken)

      return noContent('Logout successful')
    } catch (error) {
      return serverError(error.message)
    }
  }

  private async getInvalidAccessToken(data: IAuthDTO): Promise<HttpResponse<string | null>> {
    try {
      const result = await this.authUseCase.getInvalidAccessToken(data.accessToken)
      return ok<string | null>(result)
    } catch (error) {
      return serverError(error.message)
    }
  }

  private async refreshToken(data: IAuthDTO): Promise<HttpResponse<IAuthDTO | string>> {
    try {
      const refreshToken = data.refreshToken;

      if (!refreshToken) {
        return unauthorized('Refresh token not found')
      }

      const decodedRefreshToken = jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
      ) as jwt.JwtPayload

      const userRefreshTokenId = await this.authUseCase.getRefreshToken(
        decodedRefreshToken.id,
        refreshToken,
      )

      if (!userRefreshTokenId) {
        return unauthorized('Refresh token invalid or expired')
      }

      await this.authUseCase.logout(userRefreshTokenId, data.accessToken)

      const accessToken = jwt.sign(
        { id: decodedRefreshToken.id, sub: 'accessApi' },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
      )

      const newRefreshToken = jwt.sign(
        { id: decodedRefreshToken.id, sub: 'refreshToken' },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN },
      )

      await this.authUseCase.login({
        _id: decodedRefreshToken.id,
        refreshToken: newRefreshToken,
      })

      const authUser = {
        accessToken,
        refreshToken: newRefreshToken,
      }

      return ok<IAuthDTO>(authUser)
    } catch (error) {
      if (
        error instanceof jwt.TokenExpiredError ||
        error instanceof jwt.JsonWebTokenError
      ) {
        return unauthorized('Refresh token invalid or expired')
      }

      return serverError(error.message)
    }
  }

  public handle(
    type: RegisterRepositoryTypeEnum,
    request: HttpRequest<IAuthDTO>,
  ): Promise<HandleType> {
    switch (type) {
      case RegisterRepositoryTypeEnum.Register:
        return this.register(request.body)

      case RegisterRepositoryTypeEnum.Login:
        return this.login(request.body)

      case RegisterRepositoryTypeEnum.Logout:
        return this.logout(request.body)

      case RegisterRepositoryTypeEnum.InvalidAccessToken:
        return this.getInvalidAccessToken(request.body)

      case RegisterRepositoryTypeEnum.RefreshToken:
        return this.refreshToken(request.body)

      default:
        return this.logout(request.body)
    }
  }
}
