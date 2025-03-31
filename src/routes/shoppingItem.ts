import { Router } from 'express'
import { createShoppingItemController } from '../useCases/shoppingItem/createShoppingItem'
import { getShoppingItemController } from '../useCases/shoppingItem/getShoppingItems'
import { ensureAuthenticated } from './middlewares'

const routes = Router()

routes.get('/shopping-items', ensureAuthenticated, async (req, res) => {
  const { body, statusCode } = await getShoppingItemController.handle()
  res.status(statusCode).send(body)
})

routes.get('/shopping-items/:id_item_name', ensureAuthenticated, async (req, res) => {
  const { body, statusCode } = await getShoppingItemController.handle({
    body: req.body,
  })

  res.status(statusCode).send(body)
})

routes.post('/shopping-items', ensureAuthenticated, async (req, res) => {
  const { body, statusCode } = await createShoppingItemController.handle({
    body: req.body,
  })

  res.status(statusCode).send(body)
})

routes.put('/shopping-items/:id', ensureAuthenticated, async (req, res) => {
  const { body, statusCode } = await createShoppingItemController.handle({
    body: req.body,
  })

  res.status(statusCode).send(body)
})

routes.delete('/shopping-items/:id', ensureAuthenticated, async (req, res) => {
  const { body, statusCode } = await createShoppingItemController.handle({
    body: req.body,
  })

  res.status(statusCode).send(body)
})

export { routes }
