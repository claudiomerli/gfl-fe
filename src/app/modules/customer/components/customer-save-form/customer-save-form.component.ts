import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SaveCustomerDto} from "../../../shared/messages/customer/save-customer.dto";
import {ContentRules} from "../../../shared/model/content-rules";
import {Customer} from "../../../shared/model/customer";
import {ContentRulesService} from "../../../shared/services/content-rules.service";

@Component({
  selector: 'app-customer-save-form',
  templateUrl: './customer-save-form.component.html',
  styleUrls: ['./customer-save-form.component.scss']
})
export class CustomerSaveFormComponent implements OnInit {

  @Input() onSaving = false;
  @Input() customerToEdit: Customer = new Customer()
  @Output() formSubmit = new EventEmitter<SaveCustomerDto>();

  saveCustomerForm = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    contentRules: this.formBuilder.group({
      title: [''],
      linkUrl: [''],
      linkText: [''],
      body: [''],
      maxCharacterBodyLength: [undefined]
    })
  })

  constructor(private contentRulesService: ContentRulesService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.saveCustomerForm.patchValue(this.customerToEdit);
  }

  onSubmit() {
    this.formSubmit.emit(this.saveCustomerForm.value as SaveCustomerDto)
  }

}
