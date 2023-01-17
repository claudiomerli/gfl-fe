import {User} from "../../model/user";
import {ProjectCommission} from "../../model/project";

export interface Content{
  id: number
  body: string
  editor: User
  projectCommission : ProjectCommission
  contentStatus: string
  lastModifiedDate: string;
}
