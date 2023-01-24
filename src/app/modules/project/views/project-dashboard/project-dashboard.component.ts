import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {CreateProjectComponent} from "../../components/create-project/create-project.component";
import {ProjectService} from "../../../shared/services/project.service";
import {Router} from "@angular/router";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {BehaviorSubject} from "rxjs";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {Project} from "../../../shared/messages/project/project";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {projectStatuses} from "../../../shared/utils/utils";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  searchProjectFormControl = new FormControl<string>('');
  searchProjectStatusFormControl = new FormControl<string>('');

  constructor(private matDialog: MatDialog, private projectService: ProjectService, private router: Router, private store: Store) {
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

  ngOnInit(): void {
    this.search()
    this.searchProjectFormControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.pagination.page = 0;
        this.search()
      })
    this.searchProjectStatusFormControl.valueChanges.subscribe(() => {
      this.pagination.page = 0;
      this.search()
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
    }
    this.columnsToShow.push('action');
  }

  search() {
    let globalSearch = this.searchProjectFormControl.value;
    let status = this.searchProjectStatusFormControl.value;
    this.projectService
      .find(globalSearch!, status!, this.pagination)
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

  openDetail(id: any) {
    this.router.navigate(['/projects', id])
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
}
