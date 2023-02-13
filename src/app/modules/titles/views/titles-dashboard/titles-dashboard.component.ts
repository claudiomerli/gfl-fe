import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Project} from "../../../shared/messages/project/project";
import {User} from "../../../shared/messages/auth/user";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {ProjectService} from "../../../shared/services/project.service";
import {getYearList, periods, validateObject} from "../../../shared/utils/utils";
import {UserService} from "../../../shared/services/user.service";
import {ContentService} from "../../../shared/services/content.service";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {Domain} from "../../../shared/messages/domain/domain";
import {TitleResponseDto} from "../../../shared/messages/content/title-response.dto";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-titles-dashboard',
  templateUrl: './titles-dashboard.component.html',
  styleUrls: ['./titles-dashboard.component.scss']
})
export class TitlesDashboardComponent implements OnInit {

  constructor(private projectService: ProjectService, private userService: UserService, private contentService: ContentService) {
  }

  titleSearchFormGroup = new FormGroup({
    title: new FormControl(""),
    project: new FormControl<Project | string | null>(null, validateObject),
    year: new FormControl<number | null>(null),
    period: new FormControl<string | null>(null),
    editor: new FormControl<User | string | null>(null, validateObject)
  });

  projects: Project[] = []
  displayFullnameProject = (project: Project) => project?.name || ""

  editors: User[] = []
  displayNameEditor = (user: User) => user?.fullname || ""

  periods = periods
  years = getYearList()

  page?: PageResponseDto<TitleResponseDto>
  pagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "projectCommission.title",
    sortDirection: "ASC"
  }

  ngOnInit(): void {
    this.titleSearchFormGroup.controls.project.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (typeof search === "string") {
          if (search !== "") {
            this.projectService.findForAutocomplete(search, "", new PaginationDto(0, 50, "ASC", "name"))
              .subscribe(value => {
                this.projects = value.content
              })
          } else {
            this.titleSearchFormGroup.controls.project.setValue(null)
            this.projects = []
          }
        }
      })

    this.titleSearchFormGroup.controls.editor.valueChanges
      .pipe(debounceTime(200))
      .subscribe((search) => {
        if (typeof search === "string") {
          if (search !== "") {
            this.userService.findForAutocomplete(search, "EDITOR", new PaginationDto(0, 50, "ASC", "fullname"))
              .subscribe(value => {
                this.editors = value.content
              })
          } else {
            this.titleSearchFormGroup.controls.editor.setValue(null)
            this.editors = []
          }
        }
      })

    this.titleSearchFormGroup.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.search()
      })

    this.search();
  }

  search() {
    if (this.titleSearchFormGroup.valid)
      this.contentService.searchTitle({
        period: this.titleSearchFormGroup.value.period || "",
        title: this.titleSearchFormGroup.value.title || "",
        year: this.titleSearchFormGroup.value.year || "",
        editorId: (this.titleSearchFormGroup.value.editor as User)?.id || "",
        projectId: (this.titleSearchFormGroup.value.project as Project)?.id || "",
      }, this.pagination).subscribe(value => {
        this.page = value
      })
  }

  onPageChange($event: PageEvent) {
    this.pagination.page = $event.pageIndex;
    this.pagination.pageSize = $event.pageSize;
    this.search();
  }

  onSortChange($event: Sort) {
    if ($event.direction != '') {
      this.pagination.sortBy = $event.active
      this.pagination.sortDirection = $event.direction?.toUpperCase()
    } else {
      this.pagination.sortBy = "name"
      this.pagination.sortDirection = "ASC"
    }

    this.search()
  }
}
