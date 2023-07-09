import {UntypedFormControl} from "@angular/forms";

export class EditUserDto {
  fullname: string | undefined;
  email: string | undefined;
  mobilePhone: string | undefined;
  level: string | undefined;
  remuneration: string | undefined;
  password: string | undefined;

  editorInfo: string | undefined;
  editorInfoRemuneration: string | undefined;
  editorInfoNotes: string | undefined;

  companyName : string | undefined;
  url : string | undefined;
  companyDimension : string | undefined;
  businessArea : string | undefined;
  address : string | undefined;
  competitor1 : string | undefined;
  competitor2 : string | undefined;
}
