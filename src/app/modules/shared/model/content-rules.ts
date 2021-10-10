import {ContentLink} from "./content";

export class ContentRules {
  id?: number;
  title?: string;
  linkUrl?: string;
  linkText?: string;
  body?: string;
  maxCharacterBodyLength?: number;
  links? : ContentLink[];
  attachment?: {
    id: number
    filename: string,
    contentType: string
  }
}
