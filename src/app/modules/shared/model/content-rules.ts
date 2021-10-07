export class ContentRules {
  id?: number;
  title?: string;
  linkUrl?: string;
  linkText?: string;
  body?: string;
  maxCharacterBodyLength?: number;
  attachment?: {
    id: number
    filename: string,
    contentType: string
  }
}
