import {Newspaper} from "../newspaper/newspaper";
import {User} from "../auth/user";
import {ContentHint} from "../content/content-hint";

export interface Project {
  id: number;
  name: string;
  customer: User
  billingDescription: string
  billingAmount: number
  expiration: string
  status: string
  createdDate: string
  lastModifiedDate: string
  projectCommissions: ProjectCommission[]
  projectStatusChanges: ProjectStatusChange[]
  hint: ContentHint
  isDomainProject: string
  finalCustomers: User[],

  hasStartedCommission: boolean,
  hasAssignedCommission: boolean,
  hasWorkedCommission: boolean
}

export interface ProjectCommission {
  id: number
  newspaper: Newspaper
  period: string
  year: number
  anchor: string
  isAnchorBold: boolean
  isAnchorItalic: boolean
  url: string
  title: string
  notes: string
  publicationUrl: string
  publicationDate: string
  status: string
  createdDate: string
  lastModifiedDate: string
  projectStatusChanges: ProjectStatusChange[]
  projectId: number;
  contentId: number;
  project: Project,
  costSell: number;
}

export interface ProjectStatusChange {
  id: number;
  projectStatus: string;
  projectCommissionStatus: string;
  createdDate: string
}
