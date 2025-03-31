import { Router } from 'express'
import { getUsersController } from '@/useCases/user/getUsers'
import { ensureAuthenticated } from './middlewares'

const routes = Router()

routes.get('/shopping-items/users', ensureAuthenticated, async (req, res) => {
  const { body, statusCode } = await getUsersController.handle()
  res.status(statusCode).send(body)
})

routes.get('/shopping-items/users/:id_user', ensureAuthenticated, async (req, res) => {
  const { body, statusCode } = await getUsersController.handle({
    body: req.body,
  })

  res.status(statusCode).send(body)
})

export { routes }
