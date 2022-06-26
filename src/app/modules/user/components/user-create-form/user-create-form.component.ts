import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {SaveUserDto} from "../../../shared/messages/users/save-user.dto";
import {userRoles} from "../../../shared/utils/utils";

@Component({
  selector: 'app-user-create-form',
  templateUrl: './user-create-form.component.html',
  styleUrls: ['./user-create-form.component.scss']
})
export class UserCreateFormComponent implements OnInit {

  userForm: UntypedFormGroup = new UntypedFormGroup({});

  constructor() {
  }

  ngOnInit(): void {
    this.userForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required]),
      fullname: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      mobilePhone: new UntypedFormControl(''),
      level: new UntypedFormControl(''),
      remuneration: new UntypedFormControl(''),
      role: new UntypedFormControl(null, [Validators.required]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new UntypedFormControl('', [Validators.required, this.passwordMatchesValidatorFunction()])
    });
  }

  @Input()
  onSaving = false;

  @Output()
  formSubmit = new EventEmitter<SaveUserDto>();

  userRoles = userRoles;

  passwordMatchesValidatorFunction(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passwordValue = this.userForm.controls.password?.value;
      let repeatPasswordValue = control.value;
      return (passwordValue && repeatPasswordValue) && passwordValue != repeatPasswordValue
        ? {repeatPassword: {value: control.value, messaggio: 'Le password non corrispondono'}} : null;
    }
  };

  onSubmit() {
    if (this.userForm.valid) {
      this.formSubmit.emit(this.userForm.value as SaveUserDto);
    }
  }

}
