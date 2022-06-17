import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {SaveUserDto} from "../../../shared/messages/users/save-user.dto";

@Component({
  selector: 'app-user-create-form',
  templateUrl: './user-create-form.component.html',
  styleUrls: ['./user-create-form.component.scss']
})
export class UserCreateFormComponent implements OnInit {

  createUserForm: UntypedFormGroup = new UntypedFormGroup({});
  formSubmitted: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.createUserForm = new UntypedFormGroup({
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

  passwordMatchesValidatorFunction(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passwordValue = this.createUserForm.controls.password?.value;
      let repeatPasswordValue = control.value;
      return (passwordValue && repeatPasswordValue) && passwordValue != repeatPasswordValue
        ? {repeatPassword: {value: control.value, messaggio: 'Le password non corrispondono'}} : null;
    }
  };

  onSubmit() {
    this.formSubmitted = true;
    if(this.createUserForm.valid) {
      this.formSubmit.emit(this.createUserForm.value as SaveUserDto);
    }
  }

}
