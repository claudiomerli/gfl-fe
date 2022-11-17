import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../shared/services/project.service";
import {Project, ProjectCommission} from "../../../shared/model/project";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {User} from "../../../shared/model/user";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {
  momentDatePatternIso, periods,
  projectCommissionStatus,
  projectStatuses, validateObject
} from "../../../shared/utils/utils";
import {Moment} from "moment";
import * as moment from "moment";
import {
  ProjectCommissionFormComponent
} from "../../components/project-commission-form/project-commission-form.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {
  ProjectCommissionDialogFormComponent
} from "../../components/project-commission-dialog-form/project-commission-dialog-form.component";
import {Select, Store} from "@ngxs/store";
import {AuthenticationState, AuthenticationStateModel} from "../../../store/state/authentication-state";
import {Observable} from "rxjs";
import {
  CommissionHistoryDialogComponent
} from "../../../newspaper/components/commission-history-dialog/commission-history-dialog.component";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  projectFormGroup = this.createNewFormGroup();
  projectToEdit!: Project;

  @ViewChild("saveCommissionForm")
  private projectCommissionForm!: ProjectCommissionFormComponent;

  @Select(AuthenticationState.isUserInRole("ADMIN"))
  isUserAdmin$!: Observable<boolean>;

  @Select(AuthenticationState.isUserInRole("CHIEF_EDITOR"))
  isUserChiefEditor$!: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private matDialog: MatDialog,
    private store: Store,
    private router: Router
  ) {
  }

  createNewFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      billingDescription: new FormControl(''),
      billingAmount: new FormControl<number | null>(null),
      expiration: new FormControl<Moment | null>(null, [Validators.required]),
      customer: new FormControl<User | null>(null, [Validators.required, validateObject]),
    })
  }

  globalSearchFormControl = new FormControl('');
  originalCommissionForm: ProjectCommission[] | undefined
  statusFormControl = new FormControl('');
  periodFormControl = new FormControl('');

  ngOnInit(): void {
    this.loadProject();
    this.projectFormGroup.controls.customer.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (typeof search === "string") {
          if (search !== "") {
            this.userService.findForAutocomplete(search, "CUSTOMER",
              new PaginationDto(0, 50, "ASC", "fullname")
            ).subscribe(value => {
              this.customers = value.content
            })
          } else {
            this.projectFormGroup.controls.customer.setValue(null)
            this.customers = []
          }
        }
      })

    this.globalSearchFormControl.valueChanges.subscribe(() => this.applyFilterSearch())
    this.statusFormControl.valueChanges.subscribe(() => this.applyFilterSearch())
    this.periodFormControl.valueChanges.subscribe(() => this.applyFilterSearch())

    this.showColumns()
  }

  applyFilterSearch() {
    let globalSearchValue = this.globalSearchFormControl.value;
    let statusValue = this.statusFormControl.value;
    let periodValue = this.periodFormControl.value;

    this.originalCommissionForm = this.originalCommissionForm || this.projectToEdit.projectCommissions;
    this.projectToEdit.projectCommissions = this.originalCommissionForm.filter(commissionForm =>
      (commissionForm.url.toUpperCase().includes(globalSearchValue!.trim().toUpperCase()) ||
        commissionForm.notes.toUpperCase().includes(globalSearchValue!.trim().toUpperCase()) ||
        commissionForm.anchor.toUpperCase().includes(globalSearchValue!.trim().toUpperCase()) ||
        commissionForm.publicationUrl.toUpperCase().includes(globalSearchValue!.trim().toUpperCase()) ||
        commissionForm.title.toUpperCase().includes(globalSearchValue!.trim().toUpperCase()) ||
        commissionForm.newspaper.name.toUpperCase().includes(globalSearchValue!.trim().toUpperCase())) &&
      (statusValue === '' || commissionForm.status === statusValue) &&
      (periodValue === '' || commissionForm.period === periodValue)
    )
  }

  loadProject() {
    let id = this.activatedRoute.snapshot.params.id;
    let isUserAdmin = this.store.selectSnapshot(AuthenticationState.isUserInRole("ADMIN"));
    let isUserChiefEditor = this.store.selectSnapshot(AuthenticationState.isUserInRole("CHIEF_EDITOR"));
    let isUserAdministration = this.store.selectSnapshot(AuthenticationState.isUserInRole("ADMINISTRATION"));

    this.projectService
      .findById(id)
      .subscribe(value => {
        //User not allowed yet to see this project
        if (
          (value.projectCommissions.length === 0 && !isUserAdmin && !isUserChiefEditor)
          ||
          (value.status !== "SENT_TO_ADMINISTRATION" && isUserAdministration)
        ) {
          this.router.navigate(['/projects'])
        }

        this.projectToEdit = value;
        this.originalCommissionForm = undefined
        this.applyFilterSearch()
        this.patchForm(value)
      })
  }

  customers: User[] = []
  displayFullnameCustomer = (customer: User) => customer?.fullname || ""
  displayedColumns: string[] = [];

  projectCommissionStatus = projectCommissionStatus.filter(value => {
    let {role} = this.store.selectSnapshot(AuthenticationState.user)!;
    return value.roleCanView.includes(role!)
  });
  projectStatuses = projectStatuses;
  periods = periods;

  get lastStatusChange() {
    return this.projectToEdit.projectStatusChanges.length - 1
  };


  patchForm(project: Project) {
    this.projectFormGroup.patchValue({
      name: project.name,
      billingAmount: project.billingAmount,
      customer: project.customer,
      billingDescription: project.billingDescription,
      expiration: moment(project.expiration, momentDatePatternIso)
    })
  }

  update() {
    if (this.projectFormGroup.valid) {
      let value = this.projectFormGroup.value;
      this.projectService.update(this.projectToEdit.id, {
        name: value.name!,
        billingAmount: value.billingAmount!,
        customerId: value.customer?.id!,
        billingDescription: value.billingDescription!,
        expiration: value.expiration ? value.expiration.format(momentDatePatternIso) : undefined
      }).subscribe((result) => {
        this.loadProject()
      })
    }
  }


  private showColumns() {
    this.displayedColumns.push("status");
    this.displayedColumns.push("newspaper");
    this.displayedColumns.push("publicationUrl");

    let user = this.store.selectSnapshot(AuthenticationState.user);
    if (user?.role !== "CUSTOMER") {
      this.displayedColumns.push("title");
      this.displayedColumns.push("period");
      this.displayedColumns.push("url");
      this.displayedColumns.push("anchor");
      this.displayedColumns.push("actions");
    }
    this.displayedColumns.push("lastModifiedDate");
  }

  createCommission() {
    this.matDialog.open(ProjectCommissionDialogFormComponent, {
      data: {
        project: this.projectToEdit
      }
    }).afterClosed()
      .subscribe(isEdited => {
        if (isEdited) {
          this.update();
        }
      })
  }

  updateCommission(commission: ProjectCommission) {
    this.matDialog.open(ProjectCommissionDialogFormComponent, {
      data: {
        project: this.projectToEdit,
        projectCommission: commission
      }
    }).afterClosed()
      .subscribe(isEdited => {
        if (isEdited) {
          this.update()
        }
      })
  }

  onCloseProject() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: "Sei sicuro di volere segnare il progetto come fatturato?"
    }).afterClosed()
      .subscribe((answer) => {
        if (answer) {
          this.projectService.close(this.projectToEdit.id)
            .subscribe(() => {
              this.update()
            })
        }
      })
  }

  rowClass(projectCommission: ProjectCommission) {
    let user = this.store.selectSnapshot(AuthenticationState.user)!;
    let result = {
      'bg-warning': (user.role === "CHIEF_EDITOR" && projectCommission.status === "ASSIGNED") ||
        (user.role === "PUBLISHER" && projectCommission.status === "SENT_TO_NEWSPAPER"),
      'bg-danger': (user.role === "CHIEF_EDITOR" && projectCommission.status === "STANDBY_EDITORIAL") ||
        (user.role === "PUBLISHER" && projectCommission.status === "STANDBY_PUBLICATION"),
      'bg-success': (user.role === "CHIEF_EDITOR" && projectCommission.status === "TO_PUBLISH") ||
        (user.role === "PUBLISHER" && projectCommission.status === "SENT_TO_ADMINISTRATION")
    }
    return result
  }

  openHistory(projectCommission: ProjectCommission) {
    this.matDialog.open(CommissionHistoryDialogComponent, {
      data: projectCommission
    })
  }
}
