import {Newspaper} from "../newspaper/newspaper";

export interface PurchaseContent {
  id: number;
  contentNumber: number;
  contentUsed: number;
  contentRemaining: number;
  eachCost: number;
  amount: number;
  newspapers: Newspaper[]
  expiration: string
  note: string
}
