import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CreateProjectComponent} from "../../components/create-project/create-project.component";
import {ProjectService} from "../../../shared/services/project.service";
import {Router} from "@angular/router";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {BehaviorSubject, EMPTY} from "rxjs";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {Project} from "../../../shared/messages/project/project";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {getYearList, periods, projectCommissionStatus, projectStatuses} from "../../../shared/utils/utils";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {debounceTime, switchMap} from "rxjs/operators";
import {SearchProjectDto} from "../../../shared/messages/project/search-project.dto";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {NewspaperService} from "../../../shared/services/newspaper.service";

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  searchProjectFormControl = new FormControl<string>('');
  searchProjectStatusFormControl = new FormControl<string | null>(null);
  searchProjectCommissionStatusFormControl = new FormControl<string[]>([]);
  searchProjectYear = new FormControl<number | null>(null);
  searchProjectPeriod = new FormControl<string | null>(null);
  searchProjectNewspapers = new FormControl<Newspaper[]>([])

  constructor(private matDialog: MatDialog, private projectService: ProjectService, private newspaperService: NewspaperService, private router: Router, private store: Store) {
  }

  pagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "DESC"
  }

  actualPage = new BehaviorSubject<PageResponseDto<Project> | null>(null);
  projectStatuses = projectStatuses;
  columnsToShow: string[] = [];
  years = getYearList();
  periods = periods;
  projectCommissionStatuses = projectCommissionStatus;
  newspapers: Newspaper[] = [];
  newspaperInput = new FormControl<string>("")

  ngOnInit(): void {
    this.search()
    const refreshLambda = () => {
      this.pagination.page = 0;
      this.search()
    }

    this.searchProjectFormControl.valueChanges.pipe(debounceTime(500)).subscribe(refreshLambda)
    this.searchProjectCommissionStatusFormControl.valueChanges.subscribe(refreshLambda)
    this.searchProjectYear.valueChanges.subscribe(refreshLambda)
    this.searchProjectPeriod.valueChanges.subscribe(refreshLambda)
    this.searchProjectNewspapers.valueChanges.subscribe(refreshLambda)

    this.newspaperInput.valueChanges
      .pipe(
        debounceTime(200),
        switchMap(search => {
          if (search === "") {
            this.newspapers = []
            return EMPTY
          } else {
            return this.newspaperService.findForAutocomplete({name: search!}, new PaginationDto(0, 10, "ASC", "name"))
          }
        })
      ).subscribe(result => {
      this.newspapers = result.content.filter(e => !this.searchProjectNewspapers.value?.find(selected => e.id == selected.id))
    })

    this.setupColumns();
  }

  private setupColumns() {
    let isCustomer = this.store.selectSnapshot(AuthenticationState.isUserInRole("CUSTOMER"));
    this.columnsToShow.push('name');
    this.columnsToShow.push('status');
    if (!isCustomer) {
      this.columnsToShow.push('customer');
      this.columnsToShow.push('expiration');
      this.columnsToShow.push("hasStartedCommission")
      this.columnsToShow.push("hasAssignedCommission")
      this.columnsToShow.push("hasWorkedCommission")
    }
    this.columnsToShow.push('action');
  }

  search() {
    let searchProjectDto: SearchProjectDto = {
      globalSearch: this.searchProjectFormControl.value,
      status: this.searchProjectStatusFormControl.value,
      projectCommissionStatus: this.searchProjectCommissionStatusFormControl.value,
      commissionPeriod: this.searchProjectPeriod.value,
      commissionYear: this.searchProjectYear.value,
      newspapers: this.searchProjectNewspapers.value?.map(value => value.id) || []
    }

    this.projectService
      .find(searchProjectDto, this.pagination)
      .subscribe((result) => {
        this.actualPage.next(result);
      })
  }

  create() {
    this.matDialog.open(CreateProjectComponent)
      .afterClosed()
      .subscribe((value) => {
        if (value && value != "") {
          this.projectService
            .save({
              name: value
            })
            .subscribe((project) => {
              this.router.navigate(['/projects', project.id])
            })
        }
      })
  }

  sortChange($event: Sort) {
    this.pagination.page = 0;
    if ($event.active) {
      this.pagination.sortBy = $event.active;
      this.pagination.sortDirection = $event.direction.toUpperCase();
    } else {
      this.pagination.sortBy = "id";
      this.pagination.sortDirection = "DESC";
    }
    this.search();
  }

  onPageChange($event: PageEvent) {
    this.pagination.page = $event.pageIndex;
    this.pagination.pageSize = $event.pageSize;
    this.search();
  }

  onDelete(id: any) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: "Sicuro di voler eliminare il progetto?"
    }).afterClosed()
      .subscribe(answer => {
        if (answer) {
          this.projectService.deleteById(id).subscribe(() => {
            this.pagination.page = 0;
            this.search()
          })
        }
      })

  }

  newspaperSelected($event: MatAutocompleteSelectedEvent, input: HTMLInputElement) {
    this.newspaperInput.setValue("")
    input.value = ""

    this.searchProjectNewspapers?.setValue([...(this.searchProjectNewspapers.value as Newspaper[]), $event.option.value])
  }

  removeNewspaper(id: number) {
    this.searchProjectNewspapers.setValue(this.searchProjectNewspapers.value?.filter(element => element.id != id) || null);
  }
}
