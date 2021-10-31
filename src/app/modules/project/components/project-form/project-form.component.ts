import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Customer} from "../../../shared/model/customer";
import {Newspaper} from "../../../shared/model/newspaper";
import {FormBuilder, Validators} from "@angular/forms";
import {CustomerService} from "../../../shared/services/customer.service";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {Project} from "../../../shared/model/project";
import {NgxAutocompleteComponent} from "ngx-angular-autocomplete";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnChanges {

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private newspaperService: NewspaperService) {
  }

  @Input() isEdit = false
  @Input() project?: Project

  @Output() submitForm = new EventEmitter<any>();
  @Output() changeStatus = new EventEmitter<Project>();

  @ViewChild("autocompleteComponentNewspaper") autocompleteComponentNewspaper?: NgxAutocompleteComponent;
  @ViewChild("autocompleteComponentCustomer") autocompleteComponentCustomer?: NgxAutocompleteComponent;

  customerList: (Customer | undefined)[] = [];
  newspaperList: (Newspaper | undefined)[] = [];

  form = this.formBuilder.group({
    name: ['', Validators.required],
    customerId: ['', Validators.required],
    newspaperId: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && this.project) {
      this.form.patchValue({
        name: this.project.name,
        customerId: this.project.customer?.id,
        newspaperId: this.project.newspaper?.id
      });
      this.autocompleteComponentCustomer?.setValue(this.project.customer || '')
      this.autocompleteComponentNewspaper?.setValue(this.project.newspaper || '')
    }
  }

  loadCustomer(event: any) {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(event.key)) {
      this.customerService
        .find(event.target.value)
        .subscribe(value => {
          this.customerList = value.content
        })
      this.form.patchValue({customerId: ''});
    }
  }

  loadNewspaper(event: any) {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(event.key)) {
      this.newspaperService
        .find(event.target.value)
        .subscribe(value => {
          this.newspaperList = value.content
        })
      this.form.patchValue({newspaperId: ''});
    }
  }

  onSelectedValueCustomer(customerSelected: any) {
    this.form.patchValue({customerId: customerSelected.id});
  }

  onSelectedValueNewspaper(newspaperSelected: any) {
    this.form.patchValue({newspaperId: newspaperSelected.id});
  }

  onSumbit() {
    this.submitForm.emit(this.form.value)
  }
}
