import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SaveCustomerDto} from "../../shared/messages/customer/save-customer.dto";
import {ContentRules} from "../../shared/model/content-rules";
import {Customer} from "../../shared/model/customer";
import {ContentRulesService} from "../../shared/services/content-rules.service";

@Component({
  selector: 'app-customer-save-form',
  templateUrl: './customer-save-form.component.html',
  styleUrls: ['./customer-save-form.component.scss']
})
export class CustomerSaveFormComponent implements OnInit {

  @Input() onSaving = false;
  @Input() customerToEdit: Customer = new Customer()
  @Output() formSubmit = new EventEmitter<SaveCustomerDto>();
  contentRulesList: ContentRules[] = []

  saveCustomerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    contentRulesId: new FormControl(undefined, [Validators.required]),
  })

  constructor(private contentRulesService: ContentRulesService) {
  }

  ngOnInit(): void {
    this.contentRulesService.findAll().subscribe(
      contentRulesList => {
        this.contentRulesList = contentRulesList;
        this.saveCustomerForm.patchValue({
          name: this.customerToEdit.name,
          contentRulesId: this.customerToEdit.contentRules?.id
        });
      }
    )
  }

  onSubmit() {
    this.formSubmit.emit(this.saveCustomerForm.value as SaveCustomerDto)
  }

}
