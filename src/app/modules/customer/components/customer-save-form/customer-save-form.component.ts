import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Customer} from "../../../shared/model/customer";
import {ContentRulesService} from "../../../shared/services/content-rules.service";

@Component({
  selector: 'app-customer-save-form',
  templateUrl: './customer-save-form.component.html',
  styleUrls: ['./customer-save-form.component.scss']
})
export class CustomerSaveFormComponent implements OnInit {

  @Input() onSaving = false;
  @Input() isEdit = false;
  @Input() customerToEdit: Customer = new Customer()
  @Output() formSubmit = new EventEmitter<any>();
  formSubmitted: boolean = false;

  saveCustomerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    mobile: new FormControl('', []),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordMatchesValidatorFunction()]),
    contentRules: this.formBuilder.group({
      title: new FormControl(''),
      linkUrl: new FormControl(''),
      linkText: new FormControl(''),
      body: new FormControl(''),
      maxCharacterBodyLength: new FormControl(undefined)
    })
  })


  constructor(private contentRulesService: ContentRulesService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.saveCustomerForm.patchValue(this.customerToEdit);
  }

  onSubmit() {
    this.formSubmitted = true;
    this.formSubmit.emit(this.saveCustomerForm.value)
  }

  passwordMatchesValidatorFunction(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passwordValue = this.saveCustomerForm?.controls.password?.value;
      let repeatPasswordValue = control.value;
      return (passwordValue && repeatPasswordValue) && passwordValue != repeatPasswordValue
        ? {repeatPassword: {value: control.value, messaggio: 'Le password non corrispondono'}} : null;
    }
  };

}
