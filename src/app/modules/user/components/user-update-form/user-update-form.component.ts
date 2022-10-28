import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {User} from "../../../shared/model/user";
import {EditUserDto} from "../../../shared/messages/users/edit-user.dto";
import {userRoles} from "../../../shared/utils/utils";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss']
})
export class UserUpdateFormComponent implements OnInit {

  @Input() onSaving = false;
  @Input() userToEdit: User = new User()

  @Output() formSubmit = new EventEmitter<EditUserDto>();

  showChangePassword = false;

  constructor() {
  }

  ngOnInit(): void {
    this.editUserForm.patchValue(this.userToEdit)

    if (this.userToEdit.role == "CUSTOMER") {
      this.editUserForm.controls.role.disable();
    }

  }

  passwordMatchesValidatorFunction(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passwordValue = this.editUserForm.controls.password?.value;
      let repeatPasswordValue = control.value;
      return (passwordValue && repeatPasswordValue) && passwordValue != repeatPasswordValue
        ? {repeatPassword: {value: control.value, messaggio: 'Le password non corrispondono'}} : null;
    }
  };

  editUserForm = new UntypedFormGroup({
    fullname: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    mobilePhone: new UntypedFormControl(''),
    level: new UntypedFormControl(''),
    remuneration: new UntypedFormControl(''),
    role: new UntypedFormControl(null, [Validators.required]),

    password: new UntypedFormControl(''),
    repeatPassword: new UntypedFormControl('')
  });
  formSubmitted: boolean = false;
  userRoles = userRoles;

  togglePassword($event: MatSlideToggleChange) {
    this.showChangePassword = $event.checked;
    if (this.showChangePassword) {
      this.editUserForm.controls.password.setValidators([Validators.required, Validators.minLength(8)])
      this.editUserForm.controls.repeatPassword.setValidators([Validators.required, this.passwordMatchesValidatorFunction()])
    } else {
      this.editUserForm.patchValue({password: '', repeatPassword: ''})
      this.editUserForm.controls.password.clearValidators()
      this.editUserForm.controls.repeatPassword.clearValidators()
    }

    this.editUserForm.controls.password.updateValueAndValidity()
    this.editUserForm.controls.repeatPassword.updateValueAndValidity()
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.editUserForm.valid) {
      this.formSubmit.emit(this.editUserForm.getRawValue() as EditUserDto);
    }
  }

}
