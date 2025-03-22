import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {Finance} from "../../../shared/messages/newspaper/finance";
import {SearchNewspaperDto} from "../../../shared/messages/newspaper/search-newspaper.dto";
import {Sort} from "@angular/material/sort";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {PageEvent} from "@angular/material/paginator";
import {saveAs} from "file-saver";
import {MatDialog} from "@angular/material/dialog";
import {ChooseOrderDialogComponent} from "../../components/choose-order-dialog/choose-order-dialog.component";
import {OrderService} from "../../../shared/services/order.service";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-newspaper-list',
  templateUrl: './newspaper-list.component.html',
  styleUrls: ['./newspaper-list.component.scss']
})
export class NewspaperListComponent implements OnInit {

  finance$ = new BehaviorSubject<Finance>(new Finance());
  searchNewspaperDto: SearchNewspaperDto = new SearchNewspaperDto();

  actualPage$ = new BehaviorSubject<PageResponseDto<Newspaper>>(new PageResponseDto<Newspaper>());

  actualPagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "ASC"
  }

  constructor(private newspaperService: NewspaperService,
              private store: Store,
              private matDialog: MatDialog,
              private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.newspaperService.finance().subscribe(data => this.finance$.next(data));
  }


  onDelete(id: number | undefined) {
    if (id) {
      this.matDialog.open(ConfirmDialogComponent, {
        data: "Sei sicuro di voler emiminare la testata?"
      }).afterClosed()
        .subscribe(answer => {
          if (answer) {
            this.newspaperService
              .delete(id)
              .subscribe(() => {
                this.search();
              })
          }
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
    this.newspaperService.exportExcel(this.searchNewspaperDto, this.actualPagination).subscribe(data => {
      const contentType = 'application/vnd.ms.excel';
      const blob = new Blob([data], {type: contentType});
      const file = new File([blob], 'testate.xlsx', {type: contentType});
      saveAs(file);
    });
  }

  exportPDF() {
    this.newspaperService.exportPDF(this.searchNewspaperDto, this.actualPagination).subscribe(data => {
      const contentType = 'application/pdf';
      const blob = new Blob([data], {type: contentType});
      const file = new File([blob], 'testate.pdf', {type: contentType});
      saveAs(file);
    });
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

  openChooseOrderDialog(newspaper: Newspaper) {
    this.matDialog.open(ChooseOrderDialogComponent, {
      data: newspaper
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.orderService.addOrderElement(result.orderId, result.saveOrderElement)
            .subscribe(() => {
              this.search()
            })
        }
      })
  }

  onImportFile($event: File) {
    this.matDialog
      .open(ConfirmDialogComponent, {
        data: `Vuoi importare gli indici delle testate presenti nel file \n ${$event.name}?`
      }).afterClosed().subscribe(value => {
      if (value) {
        this.newspaperService.import($event)
          .subscribe(() => {
            this.search()
          })
      }
    })
  }
}
