import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../../shared/services/project.service";
import {Project, ProjectStatus} from "../../../shared/model/project";
import {BehaviorSubject, fromEvent} from "rxjs";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/pagination.dto";

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

  actualPage$ = new BehaviorSubject<PageResponseDto<Project>>(new PageResponseDto<Project>());
  actualPageValue = 1;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.onPageChange(this.actualPageValue);
  }

  ngAfterViewInit(): void {
    if (this.globalSearchInput) {
      fromEvent(this.globalSearchInput.nativeElement, 'keyup')
        .pipe(debounceTime(200))
        .subscribe((res) => {
          this.globalSearch = (res as any).target.value
          this.onPageChange(1);
        })
    }
  }

  onDelete(project: Project) {
    this.projectService.delete(project.id!)
      .subscribe(() => {
        this.onPageChange(1);
      })
  }

  onPageChange(pageNumber: number) {
    this.actualPageValue = pageNumber;
    this.projectService
      .find(this.globalSearch, {...new PaginationDto(), page: this.actualPageValue - 1})
      .subscribe(res => {
        console.log(res);
        this.actualPage$.next(res);
      })
  }

  changeStatus(project: Project) {
    this.projectService.changeStatus(project)
      .subscribe(() => {
        this.onPageChange(this.actualPageValue);
      })
  }
}
