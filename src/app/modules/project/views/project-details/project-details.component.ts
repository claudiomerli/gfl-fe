import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../shared/services/project.service";
import {Project, ProjectCommission} from "../../../shared/messages/project/project";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {User} from "../../../shared/messages/auth/user";
import {debounceTime, switchMap, tap} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {
  getYearList,
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
import {AuthenticationState} from "../../../store/state/authentication-state";
import {EMPTY, Observable, of, zip} from "rxjs";
import {
  CommissionHistoryDialogComponent
} from "../../../newspaper/components/commission-history-dialog/commission-history-dialog.component";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSelectChange} from "@angular/material/select";
import {
  ProjectNewspaperToolDialogComponent
} from "../../components/project-newspaper-tool-dialog/project-newspaper-tool-dialog.component";
import {saveAs} from "file-saver";
import {Attachment} from "../../../shared/messages/common/attachment";
import {SaveAttachmentDto} from "../../../shared/messages/attachment/save-attachment.dto";
import {Sort} from "@angular/material/sort";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {
  SelectContentPurchaseDialogComponent
} from "../../components/select-content-purchase-dialog/select-content-purchase-dialog.component";
import {PurchaseContent} from "../../../shared/messages/purchase-content/purchase-content";

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

  @Select(AuthenticationState.isUserInRole("INTERNAL_NETWORK"))
  isUserInternalNetwork$!: Observable<boolean>;

  @Select(AuthenticationState.isUserInRole("CUSTOMER"))
  isUserCustomer$!: Observable<boolean>;

  getYearList = getYearList

  selection = new SelectionModel<ProjectCommission>(true, []);

  domainProjectNewspaper?: Newspaper;
  globalSearchFormControl = new FormControl('');
  originalCommissionForm: ProjectCommission[] | undefined
  statusFormControl = new FormControl('');
  periodFormControl = new FormControl('');
  yearFormControl = new FormControl<number | null>(null);

  changeStatusFormControl = new FormControl<string | null>(null);


  projectCommissionPagination: PaginationDto = {
    page: 0,
    pageSize: 0,
    sortBy: "year",
    sortDirection: "desc"
  }
  private commissionIdAlreadyOpened = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private matDialog: MatDialog,
    private store: Store,
  ) {
  }

  createNewFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      billingDescription: new FormControl(''),
      billingAmount: new FormControl<number | null>(null),
      expiration: new FormControl<Moment | null>(null),
      customer: new FormControl<User | string | null>(null, [validateObject]),
      hintBody: new FormControl<string | null>(null),
      finalCustomers: new FormControl<User[]>([])
    })
  }


  ngOnInit(): void {
    this.loadProject();
    this.showColumns()

    this.globalSearchFormControl.valueChanges.subscribe(() => this.applyFilterSearch())
    this.statusFormControl.valueChanges.subscribe(() => this.applyFilterSearch())
    this.periodFormControl.valueChanges.subscribe(() => this.applyFilterSearch())
    this.yearFormControl.valueChanges.subscribe(() => this.applyFilterSearch())

    this.selection.changed.subscribe(() => {
      this.nextStateBulkAction = []
      let selected = this.selection.selected;

      if (selected.length > 0) {
        let status = selected[0].status;
        this.nextStateBulkAction.push(...this.projectService.getNextCommissionStepCodesByActualStatusCode(status, this.projectToEdit.isDomainProject ? "DOMAIN" : "REGULAR"))
      }
    })

    this.projectFormGroup.controls.customer.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (typeof search === "string") {
          if (search !== "") {
            this.userService.findForAutocomplete(search, "CUSTOMER",
              new PaginationDto(0, 10, "ASC", "fullname")
            ).subscribe(value => {
              this.customers = value.content
            })
          } else {
            this.projectFormGroup.controls.customer.setValue(null)
            this.customers = []
          }
        }
      })

    this.finalCustomerAutocompleteControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (value != "") {
          this.userService
            .findForAutocomplete(value!, "FINAL_CUSTOMER", new PaginationDto(0, 10, "ASC", "fullname"))
            .subscribe(result => {
              this.finalCustomerSearchResult = result.content
                .filter(user => !this.projectFormGroup.controls.finalCustomers.value!
                  .map(selectedFinalCustomers => selectedFinalCustomers.id)
                  .includes(user.id)
                )
            })
        } else {
          this.finalCustomerSearchResult = []
        }
      })


  }

  applyFilterSearch() {
    let globalSearchValue = this.globalSearchFormControl.value;
    let statusValue = this.statusFormControl.value;
    let periodValue = this.periodFormControl.value;
    let yearValue = this.yearFormControl.value;

    this.originalCommissionForm = this.originalCommissionForm || this.projectToEdit.projectCommissions;
    this.projectToEdit.projectCommissions = this.originalCommissionForm.filter(commissionForm =>
      (commissionForm.url.toUpperCase().includes(globalSearchValue!.trim().toUpperCase()) ||
        commissionForm.notes.toUpperCase().includes(globalSearchValue!.trim().toUpperCase()) ||
        commissionForm.anchor.toUpperCase().includes(globalSearchValue!.trim().toUpperCase()) ||
        commissionForm.publicationUrl.toUpperCase().includes(globalSearchValue!.trim().toUpperCase()) ||
        commissionForm.title.toUpperCase().includes(globalSearchValue!.trim().toUpperCase()) ||
        commissionForm.newspaper.name.toUpperCase().includes(globalSearchValue!.trim().toUpperCase())) &&
      (statusValue === '' || commissionForm.status === statusValue) &&
      (periodValue === '' || commissionForm.period === periodValue) &&
      (yearValue === null || commissionForm.year === yearValue)
    )

    this.changeStatusFormControl.setValue(null)
    this.selection.clear();
  }

  loadProject() {
    let id = this.activatedRoute.snapshot.params.id;
    this.projectService
      .findById(id)
      .pipe(
        switchMap(project => {
          this.projectToEdit = project;
          if (project.isDomainProject) {
            return this.projectService.getNewspaperForDomainProject(id)
          } else {
            return of(undefined)
          }
        }),
        switchMap(newspaperDomain => {
          this.domainProjectNewspaper = newspaperDomain;
          return this.projectService.getCommissions(this.projectToEdit, this.projectCommissionPagination)
        })
      )
      .subscribe(commissions => {
        this.projectToEdit.projectCommissions = commissions;

        let commissionIdToOpen = this.activatedRoute.snapshot.queryParams.commissionId;
        if (commissionIdToOpen && !this.commissionIdAlreadyOpened) {
          this.commissionIdAlreadyOpened = true
          this.updateCommission(this.projectToEdit.projectCommissions.find(pc => pc.id === parseInt(commissionIdToOpen))!);
        }

        this.originalCommissionForm = undefined
        this.applyFilterSearch()
        this.patchForm(this.projectToEdit)
      })
  }

  updateProjectCommissionList() {
    this.projectService.getCommissions(this.projectToEdit, this.projectCommissionPagination)
      .subscribe(commissions => {
        this.projectToEdit.projectCommissions = commissions
        this.originalCommissionForm = undefined
        this.applyFilterSearch();
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
  nextStateBulkAction: string[] = [];


  patchForm(project: Project) {
    this.projectFormGroup.patchValue({
      name: project.name,
      billingAmount: project.billingAmount,
      customer: project.customer,
      billingDescription: project.billingDescription,
      expiration: project.expiration ? moment(project.expiration, momentDatePatternIso) : null,
      hintBody: project.hint.body,
      finalCustomers: project.finalCustomers
    })
  }

  updateObservable() {
    let value = this.projectFormGroup.value;
    return this.projectService.update(this.projectToEdit.id, {
      name: value.name!,
      billingAmount: value.billingAmount!,
      customerId: (value.customer as User).id!,
      billingDescription: value.billingDescription!,
      expiration: value.expiration ? value.expiration.format(momentDatePatternIso) : undefined,
      hintBody: value.hintBody!
    })
  }

  update() {
    if (this.projectFormGroup.valid) {
      this.updateObservable().subscribe(() => {
        this.loadProject()
      })
    }
  }


  private showColumns() {
    let user = this.store.selectSnapshot(AuthenticationState.user);
    if (user?.role === "INTERNAL_NETWORK") {
      this.displayedColumns.push("select");
      this.displayedColumns.push("status");
      this.displayedColumns.push("publicationDate");
      this.displayedColumns.push("title");
      this.displayedColumns.push("anchor");
      this.displayedColumns.push("actions");
    } else {
      if (user?.role !== "CUSTOMER") {
        this.displayedColumns.push("select");
      }

      this.displayedColumns.push("status");
      this.displayedColumns.push("publicationDate");
      this.displayedColumns.push("publicationUrl");
      this.displayedColumns.push("newspaper");
      this.displayedColumns.push("title");
      this.displayedColumns.push("anchor");
      this.displayedColumns.push("period");
      this.displayedColumns.push("actions");
    }
  }

  createCommission(preselectedNewspaper?: number) {
    this.matDialog.open(ProjectCommissionDialogFormComponent, {
      data: {
        project: this.projectToEdit,
        preselectedNewspaper: preselectedNewspaper,
        readonlyNewspaper: this.domainProjectNewspaper?.id
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
        projectCommission: commission,
        readonlyNewspaper: this.domainProjectNewspaper?.id
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
          this.projectService.invoice(this.projectToEdit.id)
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

  getDisabledSelectionCheckBox(projectCommission: ProjectCommission) {
    let selected = this.selection.selected;
    return selected.length != 0 && projectCommission.status != this.selection.selected[0].status;
  }

  getDisabledAllSelectionCheckBox() {
    return new Set(this.projectToEdit.projectCommissions.map(value => value.status)).size != 1
  }


  onBulkAction($event: MatSelectChange) {
    let ids = this.selection.selected.map(value => value.id);
    this.projectService.updateCommissionStatusBulk(this.projectToEdit.id, ids, $event.value)
      .subscribe(() => {
        this.nextStateBulkAction = []
        this.changeStatusFormControl.setValue(null)
        this.selection.clear();
        this.update();
      })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.projectToEdit.projectCommissions.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.projectToEdit.projectCommissions);
  }

  openToolNewspaperDialog() {
    this.matDialog.open(ProjectNewspaperToolDialogComponent, {
      data: this.activatedRoute.snapshot.paramMap.get("id")
    }).afterClosed()
      .subscribe((idNewspaper) => {
        if (idNewspaper) {
          this.createCommission(idNewspaper);
        }
      })
  }

  exportProject() {
    this.projectService.export(this.projectToEdit.id)
      .subscribe(value => {
        saveAs(value, this.projectToEdit.name + ".xlsx")
      })
  }

  onUploadProjectHintAttachments(base64s: SaveAttachmentDto[]) {
    zip(...base64s.map(file =>
      this.projectService.uploadProjectHintAttachment(this.projectToEdit.id, file)
    )).pipe(switchMap(() => this.updateObservable()))
      .subscribe(() => {
        this.loadProject();
      })
  }

  onRemovedAttachment(attachment: Attachment) {
    this.projectService.deleteProjectHintAttachment(this.projectToEdit.id, attachment.id)
      .pipe(switchMap(() => this.updateObservable()))
      .subscribe(() => {
        this.loadProject();
      })
  }


  onSortChange($event: Sort) {
    if ($event.active) {
      this.projectCommissionPagination.sortBy = $event.active;
      this.projectCommissionPagination.sortDirection = $event.direction.toUpperCase();
    } else {
      this.projectCommissionPagination.sortBy = "year";
      this.projectCommissionPagination.sortDirection = "DESC";
    }
    this.updateProjectCommissionList()
  }

  //Final Customer chips autocomplete
  removeFinalCustomer(finalCustomer: User) {
    this.projectFormGroup.controls.finalCustomers.setValue(this.projectFormGroup.controls.finalCustomers.value?.filter(fc => fc.id !== finalCustomer.id) || [])
    this.updateFinalCustomers();
  }

  finalCustomerAutocompleteControl = new FormControl<string | null>("");
  finalCustomerSearchResult: User[] = [];
  @ViewChild('finalCustomerInputAutocompleteElement') finalCustomerInputAutocompleteElement!: ElementRef<HTMLInputElement>;

  addFinalCustomer($event: MatAutocompleteSelectedEvent) {
    this.projectFormGroup.controls.finalCustomers.setValue([...this.projectFormGroup.controls.finalCustomers.value!, $event.option.value])
    this.finalCustomerAutocompleteControl.setValue("")
    this.finalCustomerInputAutocompleteElement.nativeElement.value = "";
    this.finalCustomerSearchResult = []
    this.updateFinalCustomers();
  }

  updateFinalCustomers() {
    this.projectService.assignFinalCustomers(this.projectToEdit.id, this.projectFormGroup.controls.finalCustomers.value!.map(u => u.id!))
      .subscribe(() => {
        this.loadProject()
      })
  }

  /////////////


  canShowSentToAdministration(element: ProjectCommission) {
    return this.projectService.getNextCommissionStepCodesByActualStatusCode(element.status, this.projectToEdit.isDomainProject ? "DOMAIN" : "REGULAR", true).includes("SENT_TO_ADMINISTRATION");
  }

  openSelectPurchaseContentDialog(element: ProjectCommission) {
    this.matDialog.open(SelectContentPurchaseDialogComponent, {
      data: element.newspaper.id
    })
      .afterClosed()
      .subscribe((value: PurchaseContent | null) => {
        if (value) {
          this.projectService.updateCommissionStatus(this.projectToEdit.id, element.id, "SENT_TO_ADMINISTRATION", {
            contentPurchasedId: value.id
          }).subscribe(() => {
            this.loadProject()
          })
        }
      })
  }
}
