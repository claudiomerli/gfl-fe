import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  AbstractControl, FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {User} from "../../../shared/messages/auth/user";
import {EditUserDto} from "../../../shared/messages/users/edit-user.dto";
import {COMPANY_CATEGORY, COMPANY_DIMENSIONS, userRoles} from "../../../shared/utils/utils";
import {MatSlideToggle, MatSlideToggleChange} from "@angular/material/slide-toggle";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {debounceTime} from "rxjs/operators";
import {UserService} from "../../../shared/services/user.service";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {dataURItoBlob} from "../../../../utils/fileutils";

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

  protected readonly COMPANY_DIMENSIONS = COMPANY_DIMENSIONS;
  protected readonly COMPANY_CATEGORY = COMPANY_CATEGORY;
  logoFile?: File;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.editUserForm.patchValue({
      id: this.userToEdit.id,
      username: this.userToEdit.username,
      fullname: this.userToEdit.fullname,
      email: this.userToEdit.email,
      mobilePhone: this.userToEdit.mobilePhone,
      role: this.userToEdit.role,
      editorInfo: this.userToEdit.editorInfo?.info,
      editorInfoRemuneration: this.userToEdit.editorInfo?.remuneration,
      editorInfoNotes: this.userToEdit.editorInfo?.notes,

      companyName: this.userToEdit.customerInfo?.companyName,
      url: this.userToEdit.customerInfo?.url,
      companyDimension: this.userToEdit.customerInfo?.companyDimension,
      businessArea: this.userToEdit.customerInfo?.businessArea,
      address: this.userToEdit.customerInfo?.address,
      competitor1: this.userToEdit.customerInfo?.competitor1,
      competitor2: this.userToEdit.customerInfo?.competitor2,
      isAgency: this.userToEdit.customerInfo?.isAgency,
      piva: this.userToEdit.customerInfo?.piva,
      finalCustomers: this.userToEdit.finalCustomers,
      logo: this.userToEdit.customerInfo?.logo,
    })

    if (this.userToEdit.customerInfo?.logo) {
      this.logoFile = new File([dataURItoBlob(this.userToEdit.customerInfo?.logo)], "logo")
    }

    if (this.userToEdit.role == "CUSTOMER") {
      this.editUserForm.controls.role.disable();
    }

    this.finalCustomerSearchFormControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (value && value != "") {
        this.userService.findForAutocomplete(value, "FINAL_CUSTOMER", {
          page: 0,
          pageSize: 10,
          sortBy: "fullname",
          sortDirection: "ASC"
        }).subscribe(finalCustomers => {
          this.finalCustomerSuggestions = finalCustomers.content.filter(finalCustomer => !this.editUserForm.value.finalCustomers.find((fcs: any) => fcs.id == finalCustomer.id))
        })
      } else {
        this.finalCustomerSuggestions = []
      }
    })

  }

  passwordMatchesValidatorFunction(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let passwordValue = this.editUserForm.controls.password?.value;
      let repeatPasswordValue = control.value;
      return (passwordValue && repeatPasswordValue) && passwordValue != repeatPasswordValue
        ? {repeatPassword: {value: control.value, messaggio: 'Le password non corrispondono'}} : null;
    }
  };

  editUserForm = new UntypedFormGroup({
    fullname: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    mobilePhone: new UntypedFormControl(''),
    level: new UntypedFormControl(''),
    remuneration: new UntypedFormControl(''),
    role: new UntypedFormControl(null, [Validators.required]),

    password: new UntypedFormControl(''),
    repeatPassword: new UntypedFormControl(''),

    editorInfo: new UntypedFormControl(''),
    editorInfoRemuneration: new UntypedFormControl(''),
    editorInfoNotes: new UntypedFormControl(''),

    companyName: new FormControl(''),
    url: new FormControl(''),
    companyDimension: new FormControl(''),
    businessArea: new FormControl(''),
    address: new FormControl(''),
    competitor1: new FormControl(''),
    competitor2: new FormControl(''),
    isAgency: new FormControl(false),
    piva: new FormControl(''),
    finalCustomers: new FormControl<User[]>([]),
    logo: new FormControl('')
  });

  @ViewChild("finalCustomerSearchFormControlRef")
  finalCustomerSearchFormControlRefValue!: ElementRef;
  finalCustomerSearchFormControl = new FormControl<string>("")
  finalCustomerSuggestions: User[] = []
  formSubmitted: boolean = false;

  userRoles = userRoles;

  togglePassword($event: MatSlideToggleChange) {
    this.showChangePassword = $event.checked;
    if (this.showChangePassword) {
      this.editUserForm.controls.password.setValidators([Validators.required, Validators.minLength(8)])
      this.editUserForm.controls.repeatPassword.setValidators([Validators.required, this.passwordMatchesValidatorFunction()])
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
    if (this.editUserForm.valid) {
      this.formSubmit.emit({
        ...this.editUserForm.getRawValue(),
        finalCustomers: this.editUserForm.getRawValue().finalCustomers.map((e: any) => e.id)
      } as EditUserDto);
    }
  }


  selectedFinalCustomer($event: MatAutocompleteSelectedEvent) {
    this.editUserForm.controls.finalCustomers.setValue([...this.editUserForm.value.finalCustomers, $event.option.value])
    this.finalCustomerSearchFormControl.setValue("")
    this.finalCustomerSearchFormControlRefValue.nativeElement.value = ""
  }

  removeFinalCustomer(finalCustomer: any) {
    this.editUserForm.controls.finalCustomers.setValue(this.editUserForm.value.finalCustomers.filter((finalCustomerSelected: any) => finalCustomerSelected.id != finalCustomer.id))
    this.finalCustomerSearchFormControl.setValue("")
    this.finalCustomerSearchFormControlRefValue.nativeElement.value = ""
  }

  updateLogoFile($event: NgxDropzoneChangeEvent) {
    this.logoFile = $event.addedFiles[0]
    const reader = new FileReader();
    reader.readAsDataURL(this.logoFile);
    reader.onload = () => {
      this.editUserForm.controls.logo.setValue(reader.result)
    };
  }

  removeLogoFile() {
    this.logoFile = undefined
    this.editUserForm.controls.logo.setValue(null)
  }
}
