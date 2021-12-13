import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {User} from "../../../shared/model/user";
import {EditUserDto} from "../../../shared/messages/users/edit-user.dto";

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

  editUserForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobilePhone: new FormControl(''),
    level: new FormControl(''),
    remuneration: new FormControl(''),
    role: new FormControl(null, [Validators.required]),

    password: new FormControl(''),
    repeatPassword: new FormControl('')
  });
  formSubmitted: boolean = false;

  togglePassword($event: any) {
    this.showChangePassword = $event.target.checked;
    if (this.showChangePassword) {
      this.editUserForm.controls.password.setValidators([Validators.required, Validators.minLength(8)])
      this.editUserForm.controls.repeatPassword.setValidators([this.passwordMatchesValidatorFunction()])
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
    if(this.editUserForm.valid) {
      this.formSubmit.emit(this.editUserForm.value as EditUserDto);
    }
  }

}
