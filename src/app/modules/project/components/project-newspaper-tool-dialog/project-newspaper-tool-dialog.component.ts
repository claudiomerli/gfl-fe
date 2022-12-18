import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SearchNewspaperDto} from "../../../shared/messages/newspaper/search-newspaper.dto";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {BehaviorSubject} from "rxjs";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {Newspaper} from "../../../shared/model/newspaper";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-project-newspaper-tool-dialog',
  templateUrl: './project-newspaper-tool-dialog.component.html',
  styleUrls: ['./project-newspaper-tool-dialog.component.scss']
})
export class ProjectNewspaperToolDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProjectNewspaperToolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public projectId: number,
    private newspaperService: NewspaperService
  ) {
  }

  searchNewspaperDto: SearchNewspaperDto = new SearchNewspaperDto();
  actualPage$ = new BehaviorSubject<PageResponseDto<Newspaper>>(new PageResponseDto<Newspaper>());
  actualPagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "ASC"
  }

  ngOnInit(): void {
  }

  search() {
    this.newspaperService
      .find({...this.searchNewspaperDto, notUsedInProject: this.projectId}, this.actualPagination)
      .subscribe(res => {
        this.actualPage$.next(res);
      })
  }

  onSubmitSearchForm($event: SearchNewspaperDto) {
    this.searchNewspaperDto = $event;
    this.actualPagination.page = 0
    this.search();
  }

  onSortChange($event: Sort) {
    if ($event.direction != '') {
      this.actualPagination.sortBy = $event.active
      this.actualPagination.sortDirection = $event.direction?.toUpperCase()
    } else {
      this.actualPagination.sortBy = "id"
      this.actualPagination.sortDirection = "ASC"
    }

    this.search()
  }

  onPageChange($event: PageEvent) {
    this.actualPagination.page = $event.pageIndex
    this.actualPagination.pageSize = $event.pageSize
    this.search()
  }
}
