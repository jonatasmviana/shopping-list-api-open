import { RegisterRepositoryTypeEnum } from '@/repositories/auth/register/RegisterRepositoryTypeEnum'
import { authController } from '@/useCases/auth'
import { Router } from 'express'
import { ensureAuthenticated } from './middlewares'

const routes = Router()

routes.post('/shopping-items/auth/register', async (req, res) => {
  const { body, statusCode } = await authController.handle(
    RegisterRepositoryTypeEnum.Register,
    { body: req.body }
  )

  res.status(statusCode).send(body)
})

routes.post('/shopping-items/auth/login', async (req, res) => {
  const { body, statusCode } = await authController.handle(
    RegisterRepositoryTypeEnum.Login,
    { body: req.body }
  )

  res.status(statusCode).send(body)
})

routes.post('/shopping-items/auth/logout', ensureAuthenticated, async (req, res) => {
  const { body, statusCode } = await authController.handle(
    RegisterRepositoryTypeEnum.Logout,
    {
      body: {
        ...req.body,
        accessToken: req.headers.authorization
      }
    }
  )

  res.status(statusCode).send(body)
})

routes.post('/api/auth/refresh-token', ensureAuthenticated, async (req, res) => {
  const { body, statusCode } = await authController.handle(
    RegisterRepositoryTypeEnum.RefreshToken,
    {
      body: {
        ...req.body,
        accessToken: req.headers.authorization
      }
    }
  )

  res.status(statusCode).send(body)
})

export { routes }
