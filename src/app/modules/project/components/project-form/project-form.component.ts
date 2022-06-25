import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Customer} from "../../../shared/model/customer";
import {Newspaper} from "../../../shared/model/newspaper";
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from "@angular/forms";
import {CustomerService} from "../../../shared/services/customer.service";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {Project, ProjectContentPreview} from "../../../shared/model/project";
import {NgxAutocompleteComponent} from "ngx-angular-autocomplete";
import {ProjectService} from "../../../shared/services/project.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnChanges {

  constructor(private formBuilder: UntypedFormBuilder,
              private customerService: CustomerService,
              private projectService: ProjectService,
              private newspaperService: NewspaperService,
              private authService: AuthService,
              private router: Router,
              private store: Store) {
  }

  @Input() isEdit = false
  @Input() project?: Project

  @Output() submitForm = new EventEmitter<any>();
  @Output() changeStatus = new EventEmitter<Project>();

  @ViewChild("autocompleteComponentNewspaper") autocompleteComponentNewspaper?: NgxAutocompleteComponent;
  @ViewChild("autocompleteComponentCustomer") autocompleteComponentCustomer?: NgxAutocompleteComponent;

  @ViewChild("customerAutoComplete") customerAutoCompleteInputField!: ElementRef;

  customerList: (Customer | undefined)[] = [];
  newspaperList: (Newspaper | undefined)[] = [];

  formSubmitted: boolean = false;

  form = new UntypedFormGroup({
    name: new FormControl('', Validators.required),
    customerId: new FormControl(this.store.selectSnapshot(AuthenticationState.user)?.customer || '', [Validators.required]),
    projectContentPreviews: new FormArray([])
  })

  displayCustomerFn = (customer: any): string => {
    return customer.name
  };

  ngOnInit(): void {
    this.newspaperService
      .find({})
      .subscribe(value => {
        this.newspaperList = value.content
      });
  }

  aggiungiElemento(projectContentPreview?: any): UntypedFormGroup {
    return this.formBuilder.group({
      id: [projectContentPreview?.id],
      contentId: [projectContentPreview?.contentId],
      newspaperId: [projectContentPreview ? projectContentPreview?.newspaper.id : '', Validators.required],
      monthUse: [projectContentPreview?.monthUse, Validators.required],
      linkUrl: [projectContentPreview?.linkUrl, Validators.required],
      linkText: [projectContentPreview?.linkText, Validators.required],
      title: [projectContentPreview?.title, Validators.required],
      customerNotes: [projectContentPreview?.customerNotes, Validators.required]
    });
  }

  plus(projectContentPreview?: any): void {
    (this.form.get('projectContentPreviews') as UntypedFormArray).push(this.aggiungiElemento(projectContentPreview));
  }

  minus(i: number) {
    if ((this.form.get('projectContentPreviews') as UntypedFormArray).at(i).value.id) {
      this.projectService.deleteContentPreview((this.form.get('projectContentPreviews') as UntypedFormArray).at(i).value.id).subscribe(res => {
        (this.form.get('projectContentPreviews') as UntypedFormArray).removeAt(i);
      });
    } else {
      (this.form.get('projectContentPreviews') as UntypedFormArray).removeAt(i);
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
      this.customerAutoCompleteInputField.nativeElement.value = this.project.customer?.name

      if (this.project.projectContentPreviews && this.project.projectContentPreviews.length > 0) {
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

  onSubmit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  get controls(): UntypedFormControl[] {
    return (this.form.get('projectContentPreviews') as UntypedFormArray).controls as UntypedFormControl[];
  }

  gestisciRedazionale(item: ProjectContentPreview) {
    if (item.contentId) {
      this.router.navigate(["/contents/" + item.contentId]);
    } else {
      this.router.navigate(["/contents/create"], {queryParams: {previewId: item.id}});
    }
  }

  getCurrentCustomer(): string | undefined {
    return this.store.selectSnapshot(AuthenticationState.user)?.customer?.name;
  }

  optionSelectedCustomer($event: MatAutocompleteSelectedEvent) {
    this.form.controls.customerId.setValue($event.option.value)
  }
}
