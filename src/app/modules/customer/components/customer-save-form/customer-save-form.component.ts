import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
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

  saveCustomerForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    username: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.email]),
    mobile: new UntypedFormControl('', []),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
    repeatPassword: new UntypedFormControl('', [Validators.required, this.passwordMatchesValidatorFunction()]),
    contentRules: this.formBuilder.group({
      title: new UntypedFormControl(''),
      linkUrl: new UntypedFormControl(''),
      linkText: new UntypedFormControl(''),
      body: new UntypedFormControl(''),
      maxCharacterBodyLength: new UntypedFormControl(undefined)
    })
  })


  constructor(private contentRulesService: ContentRulesService, private formBuilder: UntypedFormBuilder) {
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
