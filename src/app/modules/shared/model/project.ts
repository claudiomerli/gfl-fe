import {Customer} from "./customer";
import {Newspaper} from "./newspaper";
import {Validators} from "@angular/forms";
import {User} from "./user";

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

}

export interface ProjectCommission {
  id: number
  newspaper: Newspaper
  period: string
  anchor: string
  url: string
  title: string
  notes: string
  publicationUrl: string
  status: string
  createdDate: string
  lastModifiedDate: string
  projectStatusChanges: ProjectStatusChange[]
}

export interface ProjectStatusChange {
  id: number;
  projectStatus: string;
  projectCommissionStatus: string;
  createdDate: string
}
