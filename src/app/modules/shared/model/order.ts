import {User} from "./user";
import {Newspaper} from "./newspaper";

export interface Order {
  id: number;
  status: "REQUESTED" | "CONFIRMED" | "CANCELED" | "DRAFT";
  note: string;
  name: string;
  customer: User;
  total: number;
  orderElements: OrderElement[]

}

export interface OrderElement {
  id: number;
  contentNumber: number;
  newspaper: Newspaper;
}
