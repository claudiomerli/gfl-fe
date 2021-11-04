import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent} from "rxjs";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {Project, ProjectStatus} from "../../../shared/model/project";
import {ProjectService} from "../../../shared/services/project.service";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/pagination.dto";

@Component({
  selector: 'app-project-invoicing',
  templateUrl: './project-invoicing.component.html',
  styleUrls: ['./project-invoicing.component.scss']
})
export class ProjectInvoicingComponent implements OnInit, AfterViewInit {

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

  onPageChange(pageNumber: number) {
    this.actualPageValue = pageNumber;
    this.projectService
      .find(this.globalSearch, {...new PaginationDto(), page: this.actualPageValue - 1})
      .subscribe(res => {
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
