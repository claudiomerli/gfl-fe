import {Component, OnInit} from '@angular/core';
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {OrderService} from "../../../shared/services/order.service";
import {FindOrderDto} from "../../../shared/messages/order/find-order.dto";
import {Order} from "../../../shared/model/order";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";
import {User} from "../../../shared/model/user";
import {orderStatus} from "../../../shared/utils/utils";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {Route, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {OrderDraftDialogComponent} from "../../component/order-draft-dialog/order-draft-dialog.component";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private orderService: OrderService,
              private store: Store,
              private router: Router,
              private matDialog: MatDialog) {
  }

  filters?: FindOrderDto
  orders?: PageResponseDto<Order>

  actualPagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "DESC"
  }
  displayedColumns: string[] = [];
  orderStatus = orderStatus;

  ngOnInit(): void {
    let currentUser = this.store.selectSnapshot(AuthenticationState.user);

    this.displayedColumns.push("id")
    this.displayedColumns.push("name")
    if (currentUser?.role == "ADMIN")
      this.displayedColumns.push("customer")

    this.displayedColumns.push("status")
    this.displayedColumns.push("newspaper")
    this.displayedColumns.push("total")
    this.displayedColumns.push('actions')

  }

  filterChanged(findOrderDto: FindOrderDto) {
    this.filters = findOrderDto
    this.actualPagination.page = 0
    this.search()
  }

  search() {
    this.orderService
      .find(this.filters!, this.actualPagination)
      .subscribe(result => {
        this.orders = result
      })
  }

  onPageChange($event: PageEvent) {
    this.actualPagination.page = $event.pageIndex
    this.actualPagination.pageSize = $event.pageSize
    this.search()
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

  createNewOrder() {
    this.matDialog.open(OrderDraftDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.orderService.saveDraft({
            name: result.name
          })
            .subscribe(order => {
              this.router.navigate(['/orders', order.id])
            })
        }
      })

  }
}
