import {User} from "../auth/user";
import {Project} from "../project/project";

export interface CustomerMonitor {
  id?: number
  customer?: User
  project?: Project
  status?: string,
  currentlyMonthStatus?: string
  lastWork?: string
}
