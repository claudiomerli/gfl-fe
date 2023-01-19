import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {Project} from "../../../shared/model/project";
import {Content} from "../../../shared/messages/content/content";
import {Sort} from "@angular/material/sort";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {ContentService} from "../../../shared/services/content.service";
import {contentStatus, validateObject} from "../../../shared/utils/utils";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup} from "@angular/forms";
import {Newspaper} from "../../../shared/model/newspaper";
import {debounceTime} from "rxjs/operators";
import {ProjectService} from "../../../shared/services/project.service";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {isObject} from "rxjs/internal-compatibility";
import {User} from "../../../shared/model/user";
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
    sortBy: "createdDate",
    sortDirection: "DESC"
  }
  contentStatuses = contentStatus;
  columnsToShow: string[] = [];
  contentFilter = new FormGroup({
    contentStatus: new FormControl<string | null>(null),
    project: new FormControl<Project | null | string>(null, [validateObject]),
    newspaper: new FormControl<Newspaper | null | string>(null, [validateObject]),
    editor: new FormControl<User | null | string>(null, [validateObject]),
  });
  displayFullnameProject = (project: Project) => project?.name;
  displayFullnameNewspaper = (newspaper: Newspaper) => newspaper?.name;
  displayFullnameEditor = (editor: User) => editor?.fullname || "";

  projects: Project[] = [];
  newspapers: Newspaper[] = [];
  editors: User[] = [];


  search() {
    if (this.contentFilter.valid) {
      this.contentService
        .find({
          contentStatus: this.contentFilter.value.contentStatus || "",
          newspaperId: (this.contentFilter.value.newspaper as Newspaper)?.id || "",
          projectId: (this.contentFilter.value.project as Project)?.id || "",
          editorId: (this.contentFilter.value.editor as User)?.id || ""
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
    private store : Store
  ) {
  }

  ngOnInit(): void {
    let actualUser = this.store.selectSnapshot(AuthenticationState.user)!;
    this.search()

    this.columnsToShow.push("createdDate")
    this.columnsToShow.push("lastModifiedDate")
    this.columnsToShow.push("project")
    this.columnsToShow.push("newspaper")
    this.columnsToShow.push("status")
    if(["ADMIN","CHIEF_EDITOR"].includes(actualUser.role!)){
      this.columnsToShow.push("editor")
    }
    this.columnsToShow.push("actions")

    this.contentFilter.controls.project.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value != null && typeof value === "string" && value !== "") {
          this.projectService
            .find(value, "", new PaginationDto(0, 50, "ASC", "name"))
            .subscribe(value => {
              this.projects = value.content
            })
        } else if (value != null && typeof value === "object") {
          this.search()
          this.projects = []
        } else {
          this.contentFilter.controls.project.setValue(null)
          this.projects = []
        }
      })

    this.contentFilter.controls.newspaper.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value != null && typeof value === "string" && value !== "") {
          this.newspaperService
            .find({name: value}, new PaginationDto(0, 50, "ASC", "name"))
            .subscribe(value => {
              this.newspapers = value.content
            })
        } else if (value != null && typeof value === "object") {
          this.search()
          this.newspapers = []
        } else {
          this.contentFilter.controls.newspaper.setValue(null)
          this.newspapers = []
        }
      })

    this.contentFilter.controls.editor.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value != null && typeof value === "string" && value !== "") {
          this.userService
            .find(value, "EDITOR", new PaginationDto(0, 50, "ASC", "fullname"))
            .subscribe(value => {
              this.editors = value.content
            })
        } else if (value != null && typeof value === "object") {
          this.search()
          this.editors = []
        } else {
          this.contentFilter.controls.editor.setValue(null)
          this.editors = []
        }
      })

    this.contentFilter.controls.contentStatus.valueChanges
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
