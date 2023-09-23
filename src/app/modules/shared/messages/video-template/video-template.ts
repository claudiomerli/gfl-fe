export interface VideoTemplate {
  id: number;
  type: string;
  name: string;
  url: string;
  fields: VideoTemplateField[];
  deleted: boolean;
}

export interface VideoTemplateField {
  id: number;
  field: string;
}
