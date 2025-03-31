import { User } from '@/entities/User'
import { IGetUsersRepository } from '@/repositories/user/getUsers/IGetUsersRepository'

export class GetUsersUseCase {
  constructor(private getUsersRepository: IGetUsersRepository) {}

  async get(id_user: string): Promise<User> {
    return await this.getUsersRepository.get(id_user)
  }

  async getAll(): Promise<User[]> {
    return await this.getUsersRepository.getAll()
  }

  async getByEmail(email: string): Promise<User> {
    return await this.getUsersRepository.getByEmail(email)
  }
}
