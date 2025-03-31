import { MongoGetUsersRepository } from '@/repositories/user/getUsers/MongoGetUsersRepository'
import { GetUsersUseCase } from './GetUsersUseCase'
import { GetUsersController } from './GetUsersController'

const mongoGetUsersRepository = new MongoGetUsersRepository()

const getUsersUseCase = new GetUsersUseCase(mongoGetUsersRepository)

const getUsersController = new GetUsersController(getUsersUseCase)

export { getUsersUseCase, getUsersController }
