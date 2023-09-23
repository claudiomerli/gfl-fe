import {User} from "../auth/user";
import {GenericOrder} from "./generic-order";

export interface SecondLevelGenericOrder extends GenericOrder {
  link: string

}
