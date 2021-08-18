import {AfterContentChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {User} from "../../../shared/model/user";
import {EditEditorDto} from "../../../shared/messages/editors/edit-editor.dto";

@Component({
  selector: 'app-editor-update-form',
  templateUrl: './editor-update-form.component.html',
  styleUrls: ['./editor-update-form.component.scss']
})
export class EditorUpdateFormComponent implements OnInit {

  @Input() onSaving = false;
  @Input() userToEdit: User = new User()

  @Output() formSubmit = new EventEmitter<EditEditorDto>();

  showChangePassword = false;

  constructor() {
  }

  ngOnInit(): void {
    this.editEditorForm.patchValue(this.userToEdit)
  }

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

  editEditorForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobilePhone: new FormControl(''),
    level: new FormControl(''),
    remuneration: new FormControl(''),

    password: new FormControl('',),
    repeatePassword: new FormControl('',)
  }, [this.passwordMatchesValidatorFunction])

  togglePassword($event: any) {
    this.showChangePassword = $event.target.checked;
    if (this.showChangePassword) {
      this.editEditorForm.controls.password.setValidators([Validators.required, Validators.minLength(8)])
      this.editEditorForm.controls.repeatePassword.setValidators([Validators.required, Validators.minLength(8)])
    } else {
      this.editEditorForm.patchValue({password: '', repeatePassword: ''})
      this.editEditorForm.controls.password.clearValidators()
      this.editEditorForm.controls.repeatePassword.clearValidators()
    }

    this.editEditorForm.controls.password.updateValueAndValidity()
    this.editEditorForm.controls.repeatePassword.updateValueAndValidity()
  }

  onSubmit() {
    this.formSubmit.emit(this.editEditorForm.value as EditEditorDto)
  }

}
