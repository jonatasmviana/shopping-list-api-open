import { ObjectId } from "mongodb"

export class User {
  public readonly _id: string | ObjectId
  public name: string
  public email: string
  public password: string

  constructor(props: Omit<User, '_id'>) {
    Object.assign(this, props)
  }
}
