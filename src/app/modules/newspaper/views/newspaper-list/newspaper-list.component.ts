import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Newspaper} from "../../../shared/model/newspaper";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {Finance} from "../../../shared/model/finance";
import {SearchNewspaperDto} from "../../../shared/messages/newspaper/search-newspaper.dto";
import {Sort} from "@angular/material/sort";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {PageEvent} from "@angular/material/paginator";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-newspaper-list',
  templateUrl: './newspaper-list.component.html',
  styleUrls: ['./newspaper-list.component.scss']
})
export class NewspaperListComponent implements OnInit {

  @ViewChild("globalSearchInput")
  globalSearchInput: ElementRef | undefined
  globalSearch = "";

  finance$ = new BehaviorSubject<Finance>(new Finance());
  searchNewspaperDto: SearchNewspaperDto = new SearchNewspaperDto();

  actualPage$ = new BehaviorSubject<PageResponseDto<Newspaper>>(new PageResponseDto<Newspaper>());

  displayedColumns: string[] = [];
  actualPagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "ASC"
  }

  constructor(private newspaperService: NewspaperService, private store: Store) {
  }

  ngOnInit(): void {
    this.defineColumns()
    this.newspaperService.finance().subscribe(data => this.finance$.next(data));
  }

  defineColumns() {
    const user = this.store.selectSnapshot(AuthenticationState.user);

    this.displayedColumns.push("id");
    this.displayedColumns.push("name")

    if (user?.role === "ADMIN")
      this.displayedColumns.push("purchasedContent");
    if (user?.role === "ADMIN")
      this.displayedColumns.push("leftContent");
    if (user?.role === "ADMIN")
      this.displayedColumns.push("costEach");

    this.displayedColumns.push("costSell");

    if (user?.role === "ADMIN")
      this.displayedColumns.push("za");

    if (user?.role === "ADMIN")
      this.displayedColumns.push("email");

    this.displayedColumns.push("regionalGeolocalization")
    this.displayedColumns.push("topics")

    if (user?.role === "ADMIN")
      this.displayedColumns.push("actions");
  }

  onDelete(id: number | undefined) {
    if (id) {
      this.newspaperService
        .delete(id)
        .subscribe(() => {
          this.search();
        })
    }
  }

  search() {
    this.newspaperService
      .find(this.searchNewspaperDto, this.actualPagination)
      .subscribe(res => {
        this.actualPage$.next(res);
      })
  }

  onSubmitSearchForm($event: SearchNewspaperDto) {
    this.searchNewspaperDto = $event;
    this.actualPagination.page = 0
    this.search();
  }

  exportExcel() {
    this.newspaperService.exportExcel(this.searchNewspaperDto).subscribe(data => {
      const contentType = 'application/vnd.ms.excel';
      const blob = new Blob([data], {type: contentType});
      const file = new File([blob], 'testate.xlsx', {type: contentType});
      saveAs(file);
    });
  }

  exportPDF() {
    this.newspaperService.exportPDF(this.searchNewspaperDto).subscribe(data => {
      const contentType = 'application/pdf';
      const blob = new Blob([data], {type: contentType});
      const file = new File([blob], 'testate.pdf', {type: contentType});
      saveAs(file);
    });
  }

  onSortChange($event: Sort) {
    if($event.direction != ''){
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
