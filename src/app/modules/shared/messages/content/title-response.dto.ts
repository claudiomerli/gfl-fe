import {Project} from "../project/project";
import {User} from "../auth/user";

export interface TitleResponseDto{
  title : string,
  project : Project,
  editor : User,
  period : string,
  year : number,
}
