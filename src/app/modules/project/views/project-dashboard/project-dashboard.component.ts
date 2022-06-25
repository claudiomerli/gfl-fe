import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../../shared/services/project.service";
import {Project, ProjectStatus} from "../../../shared/model/project";
import {BehaviorSubject, fromEvent} from "rxjs";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {projectStatuses} from "../../../shared/utils/utils";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit, AfterViewInit {

  ProjectStatus = ProjectStatus

  @ViewChild("globalSearchInput")
  globalSearchInput: ElementRef | undefined
  globalSearch = "";
  statusSearch = "";

  actualPage$ = new BehaviorSubject<PageResponseDto<Project>>(new PageResponseDto<Project>());
  actualPagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "ASC"
  }
  projectStatuses = projectStatuses;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.search();
  }

  ngAfterViewInit(): void {
    if (this.globalSearchInput) {
      fromEvent(this.globalSearchInput.nativeElement, 'keyup')
        .pipe(debounceTime(200))
        .subscribe((res) => {
          this.globalSearch = (res as any).target.value
          this.actualPagination.page = 0;
          this.search();
        })
    }
  }

  onDelete(project: Project) {
    this.projectService.delete(project.id!)
      .subscribe(() => {
        this.actualPagination.page = 0;
        this.search();
      })
  }

  search() {
    this.projectService
      .find(this.globalSearch, this.statusSearch, this.actualPagination)
      .subscribe(res => {
        console.log(res);
        this.actualPage$.next(res);
        this.actualPagination = {...this.actualPagination}
      })
  }

  changeStatus(project: Project) {
    this.projectService
      .changeStatus(project)
      .subscribe(() => {
        this.actualPagination.page = 0;
        this.search();
      })
  }

  onChangeStatusFilter($event: MatSelectChange) {
    this.statusSearch = $event.value
    this.search()
  }
}
