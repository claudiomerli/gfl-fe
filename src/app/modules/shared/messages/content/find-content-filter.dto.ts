export interface FindContentFilterDto {
  contentStatus?: string;
  projectId?: number | string;
  newspaperId?: number | string;
  editorId?: number | string;
  year?: number | string;
  period?: string;
}
