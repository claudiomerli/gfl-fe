import {Customer} from "./customer";

export class User {

  id: number | undefined;
  username: string | undefined;
  fullname : string | undefined;
  email : string | undefined;
  mobilePhone : string | undefined;
  averageScore : string | undefined;
  level : string | undefined;
  remuneration : string | undefined;
  role : "ADMIN" | "CHIEF_EDITOR" | "EDITOR" | "CUSTOMER" | undefined;
  customer: Customer | undefined;

}
