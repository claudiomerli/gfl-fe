export interface SaveVideoTemplateDto {
  name?: string;
  url?: string;
  type: string;
  fields?: { name: string}[];
}
