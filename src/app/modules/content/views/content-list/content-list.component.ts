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
  });
  displayFullnameProject = (project: Project) => project?.name;
  displayFullnameNewspaper = (newspaper: Newspaper) => newspaper?.name;
  projects: Project[] = [];
  newspapers: Newspaper[] = [];


  search() {
    if (this.contentFilter.valid) {
      this.contentService
        .find({
          contentStatus: this.contentFilter.value.contentStatus || "",
          newspaperId: (this.contentFilter.value.newspaper as Newspaper)?.id || "",
          projectId: (this.contentFilter.value.project as Project)?.id || "",
        }, this.pagination)
        .subscribe((result) => {
          this.actualPage.next(result);
        })
    }
  }

  constructor(private contentService: ContentService, private projectService: ProjectService, private newspaperService: NewspaperService) {
  }

  ngOnInit(): void {
    this.search()

    this.columnsToShow.push("createdDate")
    this.columnsToShow.push("lastModifiedDate")
    this.columnsToShow.push("project")
    this.columnsToShow.push("newspaper")
    this.columnsToShow.push("status")
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
