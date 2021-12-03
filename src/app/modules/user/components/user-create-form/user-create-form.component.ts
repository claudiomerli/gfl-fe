import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {SaveUserDto} from "../../../shared/messages/users/save-user.dto";

@Component({
  selector: 'app-user-create-form',
  templateUrl: './user-create-form.component.html',
  styleUrls: ['./user-create-form.component.scss']
})
export class UserCreateFormComponent implements OnInit {

  createUserForm: FormGroup = new FormGroup({});
  formSubmitted: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobilePhone: new FormControl(''),
      level: new FormControl(''),
      remuneration: new FormControl(''),
      role: new FormControl(null, [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('', [Validators.required, this.passwordMatchesValidatorFunction()])
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
