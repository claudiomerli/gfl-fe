import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent} from "rxjs";
import {Newspaper} from "../../../shared/model/newspaper";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {SortEvent} from "../../../shared/directives/sortable.directive";
import {Finance} from "../../../shared/model/finance";
import {SearchNewspaperDto} from "../../../shared/messages/newspaper/search-newspaper.dto";

@Component({
  selector: 'app-newspaper-list',
  templateUrl: './newspaper-list.component.html',
  styleUrls: ['./newspaper-list.component.scss']
})
export class NewspaperListComponent implements OnInit {

  @ViewChild("globalSearchInput")
  globalSearchInput: ElementRef | undefined
  globalSearch = "";
  searchNewspaperDto: SearchNewspaperDto = new SearchNewspaperDto();
  actualPage$ = new BehaviorSubject<PageResponseDto<Newspaper>>(new PageResponseDto<Newspaper>());
  actualPageValue = 1;
  finance$ = new BehaviorSubject<Finance>(new Finance());

  constructor(private newspaperService: NewspaperService) {
  }

  ngOnInit(): void {
    this.newspaperService.finance().subscribe(data => this.finance$.next(data));
    this.onPageChange(this.actualPageValue);
  }

  onDelete(id: number | undefined) {
    if (id) {
      this.newspaperService
        .delete(id)
        .subscribe(() => {
          this.onPageChange(1);
        })
    }
  }

  onPageChange(pageNumber: number, sortBy?: string, sortDirection?: string) {
    this.actualPageValue = pageNumber;
    this.newspaperService
      .find(this.searchNewspaperDto,  new PaginationDto(this.actualPageValue - 1, undefined ,sortDirection, sortBy ))
      .subscribe(res => {
        this.actualPage$.next(res);
      })
  }

  onSort($event: SortEvent) {
    this.onPageChange(this.actualPageValue, $event.column, $event.direction);
  }

  onSubmitSearchForm($event: SearchNewspaperDto) {
    this.searchNewspaperDto = $event;
    this.onPageChange(1);
  }
}
