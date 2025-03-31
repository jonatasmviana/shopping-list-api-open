import { User } from '@/entities/User'

export interface IGetUsersRepository {
  get(id_user: string): Promise<User>
  getAll(): Promise<User[]>
  getByEmail(email: string): Promise<User>
}
