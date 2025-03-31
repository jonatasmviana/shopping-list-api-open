import { uuid } from 'uuidv4'

export class ShoppingItem {
  public readonly id: string
  public quantity: number
  public shoppingItem: string

  constructor(props: Omit<ShoppingItem, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuid()
    }
  }
}
