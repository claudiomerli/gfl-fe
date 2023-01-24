import {User} from "../auth/user";
import {Newspaper} from "../newspaper/newspaper";
import {OrderPack} from "./order-pack";

export interface Order {
  id: number;
  status: "REQUESTED" | "CONFIRMED" | "CANCELED" | "DRAFT";
  note: string;
  name: string;
  customer: User;
  total: number;
  orderElements: OrderElement[]
  orderPack: OrderPack
  orderPackPrice: number
}

export interface OrderElement {
  id: number;
  contentNumber: number;
  newspaper: Newspaper;
}
