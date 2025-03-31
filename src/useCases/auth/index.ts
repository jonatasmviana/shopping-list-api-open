import { MongoRegisterRepository } from '@/repositories/auth/register/MongoRegisterRepository'
import { AuthController } from './AuthController'
import { AuthUseCase } from './AuthUseCase'
import { MongoGetUsersRepository } from '@/repositories/user/getUsers/MongoGetUsersRepository'
import { GetUsersUseCase } from '@/useCases/user/getUsers/GetUsersUseCase'

const mongoRegisterRepository = new MongoRegisterRepository()
const authUseCase = new AuthUseCase(mongoRegisterRepository)

const mongoGetUsersRepository = new MongoGetUsersRepository()
const getUsersUseCase = new GetUsersUseCase(mongoGetUsersRepository)

const authController = new AuthController(authUseCase, getUsersUseCase)

export { authUseCase, authController }
