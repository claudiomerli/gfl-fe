import {Customer} from "./customer";
import {Newspaper} from "./newspaper";

export class Project {
  id: number | undefined;
  name: string | undefined;
  customer: Customer | undefined;
  newspaper : Newspaper | undefined;
  createdDate: string | undefined;
  lastModifiedDate: string | undefined;
}
