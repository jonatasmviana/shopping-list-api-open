import { User } from '@/entities/User'

export interface IAuthRepository {
  register(user: User): Promise<Omit<User, 'password'>>
  login(id: string, refreshToken: string): Promise<void>
  logout(id: string, accessToken: string): Promise<void>
  refreshToken(refreshToken: string): Promise<void>
  getInvalidAccessToken(accessToken: string): Promise<string | null>
  getRefreshToken(id: string, refreshToken: string): Promise<string>
}
