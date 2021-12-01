import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
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

  editUserForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobilePhone: new FormControl(''),
    level: new FormControl(''),
    remuneration: new FormControl(''),
    role: new FormControl(null, [Validators.required]),

    password: new FormControl('',),
    repeatePassword: new FormControl('',)
  }, [this.passwordMatchesValidatorFunction])

  togglePassword($event: any) {
    this.showChangePassword = $event.target.checked;
    if (this.showChangePassword) {
      this.editUserForm.controls.password.setValidators([Validators.required, Validators.minLength(8)])
      this.editUserForm.controls.repeatePassword.setValidators([Validators.required, Validators.minLength(8)])
    } else {
      this.editUserForm.patchValue({password: '', repeatePassword: ''})
      this.editUserForm.controls.password.clearValidators()
      this.editUserForm.controls.repeatePassword.clearValidators()
    }

    this.editUserForm.controls.password.updateValueAndValidity()
    this.editUserForm.controls.repeatePassword.updateValueAndValidity()
  }

  onSubmit() {
    this.formSubmit.emit(this.editUserForm.value as EditUserDto)
  }

}
