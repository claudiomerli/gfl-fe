import {User} from "./user";
import {Newspaper} from "./newspaper";
import {ContentRules} from "./content-rules";
import {RuleSatisfation} from "./rule-satisfation";
import {Customer} from "./customer";

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
  editor?: User;
  newspaper?: Newspaper;
  customer?: Customer;
  contentRules?: ContentRules;
  ruleSatisfation?: RuleSatisfation;
  score?: number;
  monthUse? : "JANUARY" | "FEBRUARY" | "MARCH" | "APRIL" | "MAY" | "JUNE" | "JULY" | "AUGUST" | "SEPTEMBER" | "OCTOBER" | "NOVEMBER" | "DECEMBER"
}

export interface ContentLink {
  linkUrl?: string;
  linkText?: string;
}
