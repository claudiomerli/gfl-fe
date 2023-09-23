import {User} from "../auth/user";


export interface GenericOrder {

  id: number
  status: string
  type: string
  level: string
  customer: User
  createdDate: string
  lastModifiedDate: string

}
