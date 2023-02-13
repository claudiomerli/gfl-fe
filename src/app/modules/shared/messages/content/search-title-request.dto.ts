export interface SearchTitleRequestDto{
  title : string;
  projectId : string | number;
  year : string | number;
  period : string;
  editorId : string | number;
}
