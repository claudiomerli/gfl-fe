import {User} from "./user";
import {Newspaper} from "./newspaper";
import {ContentRules} from "./content-rules";
import {RuleSatisfation} from "./rule-satisfation";
import {Customer} from "./customer";
import {Project} from "./project";

export enum ContentProjectStatus {
  CREATED = "Creato",
  WORKING = "In Lavorazione",
  TO_BE_PUBLISHED = "Da Pubblicare",
  PUBLISHED = "Pubblicato",
}

export class Content {
  id?: number
  title?: string;
  links?: ContentLink[];
  body?: string;
  exportFileName?: string;
  customerToken?: string;
  customerNotes?: string;
  adminNotes?: string;
  deliveryDate?: Date;
  createdDate?: Date;
  lastModifiedDate?: Date;
  contentStatus?: "WORKING" | "DELIVERED" | "APPROVED";
  projectStatus?: ContentProjectStatus
  editor?: User;
  newspaper?: Newspaper;
  customer?: Customer;
  project?: Project;
  contentRules?: ContentRules;
  ruleSatisfation?: RuleSatisfation;
  score?: number;
  monthUse?: "JANUARY" | "FEBRUARY" | "MARCH" | "APRIL" | "MAY" | "JUNE" | "JULY" | "AUGUST" | "SEPTEMBER" | "OCTOBER" | "NOVEMBER" | "DECEMBER"

  get nextProjectStatus(): String | undefined {
    switch (this.projectStatus) {
      case undefined:
        return "CREATED"
      case ContentProjectStatus.CREATED:
        return "WORKING"
      case ContentProjectStatus.WORKING:
        return "TO_BE_PUBLISHED"
      case ContentProjectStatus.TO_BE_PUBLISHED:
        return "PUBLISHED"
      default:
        return undefined
    }
  }

  constructor(item: any) {
    this.id = item.id;
    this.title = item.title;
    this.links = item.links;
    this.body = item.body;
    this.exportFileName = item.exportFileName;
    this.customerToken = item.customerToken;
    this.customerNotes = item.customerNotes;
    this.adminNotes = item.adminNotes;
    this.deliveryDate = item.deliveryDate;
    this.createdDate = item.createdDate;
    this.lastModifiedDate = item.lastModifiedDate;
    this.contentStatus = item.contentStatus;
    this.projectStatus = ContentProjectStatus[item.projectStatus as keyof typeof ContentProjectStatus]
    this.newspaper = item.newspaper;
    this.customer = item.customer;
    this.project = item.project;
    this.contentRules = item.contentRules;
    this.ruleSatisfation = item.ruleSatisfation;
    this.score = item.score;
    this.monthUse = item.monthUse;
  }

}

export interface ContentLink {
  linkUrl?: string;
  linkText?: string;
}
