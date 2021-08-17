import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {SaveEditorDto} from "../../../shared/messages/save-editor.dto";

@Component({
  selector: 'app-editor-create-form',
  templateUrl: './editor-create-form.component.html',
  styleUrls: ['./editor-create-form.component.scss']
})
export class EditorCreateFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @Output()
  formSubmit = new EventEmitter<SaveEditorDto>();

  passwordMatchesValidatorFunction: ValidatorFn = formGroup => {
    let passwordValue = formGroup.get("password")?.value;
    let repeatePasswordValue = formGroup.get("repeatePassword")?.value;

    if ((passwordValue && repeatePasswordValue) && passwordValue != repeatePasswordValue) {
      return {
        "passwordMismatches": true
      }
    }

    return null;
  };

  createEditorForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobilephone: new FormControl(''),
    level: new FormControl(''),
    remuneration: new FormControl(''),

    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatePassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, [this.passwordMatchesValidatorFunction])

  onSubmit() {
    this.formSubmit.emit(this.createEditorForm.value as SaveEditorDto)
  }

}
