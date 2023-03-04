import {Newspaper} from "../newspaper/newspaper";

export interface PurchaseContent{
  id : number;
  contentNumber : number;
  contentUsed : number;
  contentRemaining : number;
  amount: number;
  newspapers : Newspaper[],
  note: string
}
