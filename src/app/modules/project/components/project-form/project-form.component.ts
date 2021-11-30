import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Customer} from "../../../shared/model/customer";
import {Newspaper} from "../../../shared/model/newspaper";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../shared/services/customer.service";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {Project} from "../../../shared/model/project";
import {NgxAutocompleteComponent} from "ngx-angular-autocomplete";
import {ProjectService} from "../../../shared/services/project.service";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnChanges {

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private projectService: ProjectService,
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
    projectContentPreviews: this.formBuilder.array([])
  });

  ngOnInit(): void {
    this.newspaperService
      .find('')
      .subscribe(value => {
        this.newspaperList = value.content
      });
  }

  aggiungiElemento(projectContentPreview?: any): FormGroup {
    return this.formBuilder.group({
      id: [projectContentPreview?.id],
      newspaperId: [projectContentPreview?.newspaper.id, Validators.required],
      monthUse: [projectContentPreview?.monthUse, Validators.required],
      linkUrl: [projectContentPreview?.linkUrl, Validators.required],
      linkText: [projectContentPreview?.linkText, Validators.required],
      title: [projectContentPreview?.title, Validators.required],
      customerNotes: [projectContentPreview?.customerNotes, Validators.required]
    });
  }

  plus(projectContentPreview?: any): void {
    (this.form.get('projectContentPreviews') as FormArray).push(this.aggiungiElemento(projectContentPreview));
  }
  minus(i: number) {
    if((this.form.get('projectContentPreviews') as FormArray).at(i).value.id){
      this.projectService.deleteContentPreview((this.form.get('projectContentPreviews') as FormArray).at(i).value.id).subscribe(res => {
        (this.form.get('projectContentPreviews') as FormArray).removeAt(i);
      });
    } else {
      (this.form.get('projectContentPreviews') as FormArray).removeAt(i);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && this.project) {
      let projectValue = {
        name: this.project.name,
        customerId: this.project.customer?.id,
        projectContentPreviews: []
      };
      this.form.patchValue(projectValue);
      if(this.project.projectContentPreviews && this.project.projectContentPreviews.length >0){
        this.project.projectContentPreviews.forEach(projectContentPreview => this.plus(projectContentPreview));
      }
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

  get controls(): FormControl[] {
    return (this.form.get('projectContentPreviews') as FormArray).controls as FormControl[];
  }

}
