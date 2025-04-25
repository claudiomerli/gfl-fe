import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Newspaper} from "../../../../../shared/messages/newspaper/newspaper";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../../../shared/messages/common/pagination.dto";
import {NewspaperService} from "../../../../../shared/services/newspaper.service";
 import {ContentPurchaseService} from "../../../../../shared/services/content-purchase.service";
import {PageResponseDto} from "../../../../../shared/messages/common/page-response.dto";
import {PurchaseContent} from "../../../../../shared/messages/purchase-content/purchase-content";
import {BehaviorSubject} from "rxjs";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {validateObject} from "../../../../../shared/utils/utils";
import * as moment from "moment";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-content-purchase-list',
  templateUrl: './content-purchase-list.component.html',
  styleUrls: ['./content-purchase-list.component.scss']
})
export class ContentPurchaseListComponent implements OnInit {


  constructor(private newspaperService: NewspaperService, private purchaseContentService: ContentPurchaseService) {
  }

  searchForm = new FormGroup({
    globalSearch: new FormControl<string>(""),
    newspaper: new FormControl<Newspaper | null | string>(null, [validateObject]),
    expirationDateFrom: new FormControl<moment.Moment|null>(null),
    expirationDateTo: new FormControl<moment.Moment|null>(null),
  })

  pagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "createdDate",
    sortDirection: "DESC"
  }

  newspapers: Newspaper[] = [];
  displayFullnameNewspaper = (newspaper: Newspaper) => newspaper?.name!;

  actualPage = new BehaviorSubject<PageResponseDto<PurchaseContent> | null>(null);

  ngOnInit(): void {
    this.searchForm.controls.newspaper.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => {
        if (value != null && typeof value === "string" && value !== "") {
          this.newspaperService
            .find({name: value}, new PaginationDto(0, 10, "ASC", "name"))
            .subscribe(value => {
              this.newspapers = value.content
            })
        } else {
          this.newspapers = []
        }
      })
    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      this.search()
    })

    this.search();
  }

  search() {
    if (this.searchForm.valid) {
      this.purchaseContentService.findAll({
        globalSearch: this.searchForm.value.globalSearch || "",
        newspaperId: (this.searchForm.value.newspaper as Newspaper)?.id || "",
        expirationFrom: this.searchForm.value.expirationDateFrom ? this.searchForm.value.expirationDateFrom.format("YYYY-MM-DD") : "",
        expirationTo: this.searchForm.value.expirationDateTo ? this.searchForm.value.expirationDateTo.format("YYYY-MM-DD") : "",
      }, this.pagination).subscribe(value => {
        this.actualPage.next(value);
      })
    }
  }


  sortChange($event: Sort) {
    this.pagination.page = 0;
    if ($event.active) {
      this.pagination.sortBy = $event.active;
      this.pagination.sortDirection = $event.direction.toUpperCase();
    } else {
      this.pagination.sortBy = "createdDate";
      this.pagination.sortDirection = "DESC";
    }
    this.search();
  }

  onPageChange($event: PageEvent) {
    this.pagination.page = $event.pageIndex;
    this.pagination.pageSize = $event.pageSize;
    this.search();
  }

  export() {
    this.purchaseContentService.export({
      globalSearch: this.searchForm.value.globalSearch || "",
      newspaperId: (this.searchForm.value.newspaper as Newspaper)?.id || "",
      expirationFrom: this.searchForm.value.expirationDateFrom ? this.searchForm.value.expirationDateFrom.format("YYYY-MM-DD") : "",
      expirationTo: this.searchForm.value.expirationDateTo ? this.searchForm.value.expirationDateTo.format("YYYY-MM-DD") : "",
    }, this.pagination).subscribe(value => {
      saveAs(value,"acquisti-contenuti.xlsx")
    })
  }
}
