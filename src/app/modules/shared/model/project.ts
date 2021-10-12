import {Customer} from "./customer";

export class Project {
  id: number | undefined;
  name: string | undefined;
  customer: Customer | undefined;
  createdDate: string | undefined;
  lastModifiedDate: string | undefined;
}
