import {Component, OnInit, ViewChild} from '@angular/core';
import {ContentService} from "../../../shared/services/content.service";
import {BehaviorSubject} from "rxjs";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {Content} from "../../../shared/model/content";
import {SearchContentDto} from "../../../shared/messages/search-content.dto";
import {ModalComponent, ModalSize} from "../../../shared/components/modal/modal.component";
import {ActivatedRoute} from "@angular/router";
import {SortEvent} from "../../../shared/directives/sortable.directive";

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  searchParameter: SearchContentDto = new SearchContentDto()

  actualPage$ = new BehaviorSubject<PageResponseDto<Content>>(new PageResponseDto<Content>());
  actualPageValue = 1;

  @ViewChild('modal')
  modal?: ModalComponent;
  modalSize = ModalSize.XL

  selectedContent?: Content;

  constructor(private contentService: ContentService, private activatedRoute: ActivatedRoute) {
  }

  onSubmitSearchForm($event: any) {
    this.searchParameter = $event
    this.onPageChange(1);
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.projectId) {
      this.searchParameter.projectId = parseInt(this.activatedRoute.snapshot.queryParams.projectId);
    }

    this.onPageChange(this.actualPageValue);
  }

  onPageChange(pageNumber: number, sortBy?: string, sortDirection?: string) {
    this.actualPageValue = pageNumber;
    this.contentService
      .find(this.searchParameter, new PaginationDto(this.actualPageValue - 1, undefined ,sortDirection, sortBy ))
      .subscribe(res => {
        this.actualPage$.next(res);
      })
  }

  delete(id: number | undefined) {
    if (id)
      this.contentService.delete(id).subscribe(() => {
        this.onPageChange(this.actualPageValue)
      })
  }

  showDetail(item: Content) {
    this.selectedContent = item;
    console.log(item)
    if (this.modal) {
      this.modal.open(`Articolo: ${item.title}`);
    }
  }

  changeProjectStatus(content: Content) {
    this.contentService.changeProjectStatus(content)
      .subscribe(() => {
        this.onPageChange(this.actualPageValue);
      })
  }

  onSort($event: SortEvent) {
    this.onPageChange(this.actualPageValue, $event.column, $event.direction);
  }
}
