import { User } from '@/entities/User'
import { IAuthRepository } from '@/repositories/auth/register/IRegisterRepository'
import { IAuthDTO } from './AuthDTO'
import { ObjectId } from 'mongodb'

export class AuthUseCase {
  constructor(private registerRepository: IAuthRepository) {}

  async register(data: IAuthDTO): Promise<Omit<User, 'password'>> {
    const user = new User(data)
    return await this.registerRepository.register(user)
  }

  async login({ _id, refreshToken }: Pick<IAuthDTO, '_id' | 'refreshToken'>): Promise<void> {
    await this.registerRepository.login(_id, refreshToken)
  }

  async logout(id: string, accessToken: string): Promise<void> {
    await this.registerRepository.logout(id, accessToken)
  }

  async refreshToken(refreshToken: string): Promise<void> {
    return await this.registerRepository.refreshToken(refreshToken)
  }

  async getInvalidAccessToken(accessToken: string): Promise<string | null> {
    return await this.registerRepository.getInvalidAccessToken(accessToken)
  }

  async getRefreshToken(id: string, refreshToken: string): Promise<string> {
    return await this.registerRepository.getRefreshToken(id, refreshToken)
  }
}
