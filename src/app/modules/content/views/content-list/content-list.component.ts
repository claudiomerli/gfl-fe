import {Component, OnInit} from '@angular/core';
import {ContentService} from "../../../shared/services/content.service";
import {BehaviorSubject} from "rxjs";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {Content} from "../../../shared/model/content";
import {SearchContentDto} from "../../../shared/messages/search-content.dto";

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  constructor(private contentService: ContentService) {
  }

  searchParameter: SearchContentDto = new SearchContentDto()

  actualPage$ = new BehaviorSubject<PageResponseDto<Content>>(new PageResponseDto<Content>());
  actualPageValue = 1;


  onSubmitSearchForm($event: any) {
    this.searchParameter = $event
    this.onPageChange(1);
  }

  ngOnInit(): void {
    this.onPageChange(this.actualPageValue);
  }

  // onDelete(id: number | undefined) {
  //   if (id) {
  //     this.customerService
  //       .delete(id)
  //       .subscribe(() => {
  //         this.onPageChange(1);
  //       })
  //   }
  // }

  onPageChange(pageNumber: number) {
    this.actualPageValue = pageNumber;
    this.contentService
      .find(this.searchParameter, {...new PaginationDto(), page: this.actualPageValue - 1})
      .subscribe(res => {
        this.actualPage$.next(res);
      })
  }

}
