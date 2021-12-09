import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
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

  passwordMatchesValidatorFunction: ValidatorFn = formGroup => {
    let passwordValue = formGroup.get("password")?.value;
    let repeatPasswordValue = formGroup.get("repeatPassword")?.value;

    if ((passwordValue && repeatPasswordValue) && passwordValue != repeatPasswordValue) {
      return {
        "passwordMismatches": true
      }
    }
    return null;
  };

  saveCustomerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', []),
    mobile: new FormControl('', []),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),

    contentRules: this.formBuilder.group({
      title: new FormControl(''),
      linkUrl: new FormControl(''),
      linkText: new FormControl(''),
      body: new FormControl(''),
      maxCharacterBodyLength: new FormControl(undefined)
    })
  }, [this.passwordMatchesValidatorFunction])


  constructor(private contentRulesService: ContentRulesService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.saveCustomerForm.patchValue(this.customerToEdit);
  }

  onSubmit() {
    this.formSubmit.emit(this.saveCustomerForm.value)
  }

}
