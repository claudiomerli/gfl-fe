import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {Project} from "../../../shared/messages/project/project";
import {Content} from "../../../shared/messages/content/content";
import {Sort} from "@angular/material/sort";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {ContentService} from "../../../shared/services/content.service";
import {
  contentStatus,
  getYearList,
  periods,
  projectCommissionStatus,
  validateObject
} from "../../../shared/utils/utils";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup} from "@angular/forms";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {debounceTime} from "rxjs/operators";
import {ProjectService} from "../../../shared/services/project.service";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {isObject} from "rxjs/internal-compatibility";
import {User} from "../../../shared/messages/auth/user";
import {UserService} from "../../../shared/services/user.service";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {
  actualPage = new BehaviorSubject<PageResponseDto<Content> | null>(null);
  pagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "assignDate",
    sortDirection: "DESC"
  }
  contentStatuses = contentStatus;
  projectCommissionStatus = projectCommissionStatus
  columnsToShow: string[] = [];
  contentFilter = new FormGroup({
    contentStatus: new FormControl<string | null>(null),
    project: new FormControl<Project | null | string>(null, [validateObject]),
    newspaper: new FormControl<Newspaper | null | string>(null, [validateObject]),
    editor: new FormControl<User | null | string>(null, [validateObject]),
    year: new FormControl<number | null>(null),
    period: new FormControl<string | null>(null)
  });
  displayFullnameProject = (project: Project) => project?.name || '';
  displayFullnameNewspaper = (newspaper: Newspaper) => newspaper?.name || '';
  displayFullnameEditor = (editor: User) => editor?.fullname || "";

  projects: Project[] = [];
  newspapers: Newspaper[] = [];
  editors: User[] = [];

  periods = periods
  years = getYearList();

  search() {
    if (this.contentFilter.valid) {
      this.contentService
        .find({
          contentStatus: this.contentFilter.value.contentStatus || "",
          newspaperId: (this.contentFilter.value.newspaper as Newspaper)?.id || "",
          projectId: (this.contentFilter.value.project as Project)?.id || "",
          editorId: (this.contentFilter.value.editor as User)?.id || "",
          year: (this.contentFilter.value.year) || "",
          period: (this.contentFilter.value.period) || "",
        }, this.pagination)
        .subscribe((result) => {
          this.actualPage.next(result);
        })
    }
  }

  constructor(
    private contentService: ContentService,
    private projectService: ProjectService,
    private newspaperService: NewspaperService,
    private userService: UserService,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    let actualUser = this.store.selectSnapshot(AuthenticationState.user)!;
    this.search()

    this.columnsToShow.push("period")
    this.columnsToShow.push("project")
    this.columnsToShow.push("newspaper")
    this.columnsToShow.push("title")
    this.columnsToShow.push("commissionStatus")
    this.columnsToShow.push("status")
    if (["ADMIN", "CHIEF_EDITOR"].includes(actualUser.role!)) {
      this.columnsToShow.push("assignDate")
      this.columnsToShow.push("editor")
    }
    this.columnsToShow.push("actions")

    this.contentFilter.controls.project.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value != null && typeof value === "string" && value !== "") {
          this.projectService
            .find({globalSearch: value}, new PaginationDto(0, 10, "ASC", "name"))
            .subscribe(value => {
              this.projects = value.content
            })
        } else {
          this.projects = []
        }
      })

    this.contentFilter.controls.newspaper.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value != null && typeof value === "string" && value !== "") {
          this.newspaperService
            .find({name: value}, new PaginationDto(0, 10, "ASC", "name"))
            .subscribe(value => {
              this.newspapers = value.content
            })
        } else {
          this.newspapers = []
        }
      })

    this.contentFilter.controls.editor.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value != null && typeof value === "string" && value !== "") {
          this.userService
            .find(value, "EDITOR", new PaginationDto(0, 10, "ASC", "fullname"))
            .subscribe(value => {
              this.editors = value.content
            })
        } else {
          this.editors = []
        }
      })

    this.contentFilter.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.search()
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
}
