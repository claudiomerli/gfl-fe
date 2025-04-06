import {Component, OnInit} from '@angular/core';
import {User} from "../../../shared/messages/auth/user";
import {FormArray, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {addErrorToFormControl, compareWithProject, currentlyMonthCustomerMonitorStatus, customerMonitorStatus, displayFullnameCustomer, displayFullnameProject, lastWorkOptions, removeErrorFromFormControl, validateObject} from "../../../shared/utils/utils";
import {combineAll, debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {UserService} from "../../../shared/services/user.service";
import {CustomerMonitorService} from "../../../shared/services/customer-monitor.service";
import {Project} from "../../../shared/messages/project/project";
import {CustomerMonitor} from "../../../shared/messages/customer-monitor/customer-monitor";
import {ProjectService} from "../../../shared/services/project.service";
import {combineLatest, zip} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ChatDialogComponent} from "../../../shared/components/chat-dialog/chat-dialog.component";
import {SearchMessageDTO} from "../../../shared/messages/message/search-message.dto";

export type CustomerMonitorFormType = {
  id: FormControl<number | undefined | null>,
  project: FormControl<Project | string | undefined | null>,
  status: FormControl<string | undefined | null>,
  lastWork: FormControl<string | undefined | null>,
  currentlyMonthStatus: FormControl<string | undefined | null>,
}

@Component({
  selector: 'app-customer-monitor',
  templateUrl: './customer-monitor.component.html',
  styleUrls: ['./customer-monitor.component.scss']
})
export class CustomerMonitorComponent implements OnInit {


  customers: User[] = [];
  customerAutoComplete = new FormControl<User | string | null>(null, validateObject)

  projects: Project[] = []

  validateProjects: ValidatorFn = (array) => {
    const castedArray = array as FormArray<FormGroup<CustomerMonitorFormType>>
    castedArray.controls.forEach(formGroup => {
      let projectControl = formGroup.controls.project;

      if (projectControl.value && typeof projectControl.value === "object") {
        let selectedId = (projectControl.value as Project).id;
        let allIds = castedArray.value.map(value => (value.project as any)?.id)
        if (allIds.filter(value => value === selectedId).length > 1) {
          addErrorToFormControl(projectControl, "duplicateProject", true);
        } else {
          removeErrorFromFormControl(projectControl, "duplicateProject")
        }
      }
    })
    return null
  }
  customerMonitorFormArray = new FormArray<FormGroup<CustomerMonitorFormType>>([], this.validateProjects);

  lastWorkOptionsValue = lastWorkOptions()

  constructor(private userService: UserService, private customerMonitorService: CustomerMonitorService, private projectService: ProjectService, private dialogService: MatDialog) {
  }

  ngOnInit(): void {
    this.customerAutoComplete.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (typeof search === "string") {
          if (search !== "") {
            this.userService.findForAutocomplete(search, "CUSTOMER", new PaginationDto(0, 10, "ASC", "fullname"))
              .subscribe(value => {
                this.customers = value.content
              })
          } else {
            this.customerAutoComplete.setValue(null)
            this.customers = []
          }
        }

        if (search && typeof search === "object") {
          zip(
            this.projectService.find({customerId: (search as User).id,}, {page: 0, pageSize: 100, sortBy: "name", sortDirection: "ASC"}),
            this.customerMonitorService.findCustomerMonitorByCustomer(search as User),
          ).subscribe((results) => {
            this.projects = results[0].content;

            this.customerMonitorFormArray.clear()
            results[1].forEach(customerMonitor => {
              this.customerMonitorFormArray.push(this.buildCustomerMonitorForm(customerMonitor))
            })
          })
        } else {
          this.customerMonitorFormArray.clear()
        }
      })
  }


  buildCustomerMonitorForm(customerMonitor: CustomerMonitor) {
    const formGroup = new FormGroup<CustomerMonitorFormType>({
      id: new FormControl<number | undefined>(customerMonitor.id),
      project: new FormControl<Project | string | undefined>(customerMonitor.project, [validateObject]),
      status: new FormControl<string | undefined>(customerMonitor.status, Validators.required),
      lastWork: new FormControl<string | undefined>(customerMonitor.lastWork, Validators.required),
      currentlyMonthStatus: new FormControl<string | undefined>(customerMonitor.currentlyMonthStatus)
    })

    formGroup.valueChanges.subscribe(value => {
      if (formGroup.valid) {
        this.customerMonitorService.saveCustomerMonitor({
          id: value.id!,
          customerId: (this.customerAutoComplete.value as User).id!,
          status: value.status!,
          currentlyMonthStatus: value.currentlyMonthStatus!,
          lastWork: value.lastWork!,
          projectId: (value.project as Project).id
        }).subscribe(result => {
          formGroup.controls.id.setValue(result.id!, {emitEvent: false})
        })
      }
    })

    return formGroup;
  }

  addCustomerMonitor() {
    this.customerMonitorFormArray.push(this.buildCustomerMonitorForm({}))
  }

  protected readonly displayFullnameCustomer = displayFullnameCustomer;
  protected readonly displayFullnameProject = displayFullnameProject;
  protected readonly customerMonitorStatus = customerMonitorStatus;
  protected readonly currentlyMonthCustomerMonitorStatus = currentlyMonthCustomerMonitorStatus;
  protected readonly compareWithProject = compareWithProject;

  delete(i: number) {
    if (this.customerMonitorFormArray.at(i).controls.id.value) {
      this.customerMonitorService.deleteCustomerMonitor(this.customerMonitorFormArray.at(i).controls.id.value!)
        .subscribe(() => this.customerMonitorFormArray.removeAt(i))
    } else {
      this.customerMonitorFormArray.removeAt(i)
    }
  }

  openChat(i: number) {
    const id = this.customerMonitorFormArray.at(i).controls.id.value
    const config: MatDialogConfig<SearchMessageDTO> = {
      width: "800px",
      data: {
        title: "Messaggi con il cliente",
        topicId: id?.toString(),
        topicType: "CUSTOMER_MONITOR",
        participant1Role: "ADMIN",
        participant2UserId: (this.customerAutoComplete.value as User).id
      }
    }
    this.dialogService.open(ChatDialogComponent, config)
  }
}
