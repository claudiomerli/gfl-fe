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
}
