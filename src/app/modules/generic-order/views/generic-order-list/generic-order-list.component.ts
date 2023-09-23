import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../shared/messages/auth/user";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {orderLevel, orderStatus, orderTypes, validateObject, validateObjectNullable} from "../../../shared/utils/utils";
import {UserService} from "../../../shared/services/user.service";
import {GenericOrderService} from "../../../shared/services/generic-order.service";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {GenericOrder} from "../../../shared/messages/generic-order/generic-order";
import {BehaviorSubject} from "rxjs";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-generic-order-list',
  templateUrl: './generic-order-list.component.html',
  styleUrls: ['./generic-order-list.component.scss']
})
export class GenericOrderListComponent implements OnInit {

  filterForm = new FormGroup({
    orderType: new FormControl<string | ''>(''),
    orderLevel: new FormControl<string | ''>(''),
    orderStatus: new FormControl<string | ''>(''),
    customer: new FormControl<string | User | null>('', [validateObjectNullable])
  })

  customers: User[] = [];
  displayFullnameCustomer = (editor: User) => editor?.fullname || ""

  pagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "DESC"
  }

  actualPage = new BehaviorSubject<PageResponseDto<GenericOrder>>(new PageResponseDto<GenericOrder>());


  constructor(private userService: UserService, private genericOrderService: GenericOrderService) {
  }

  ngOnInit(): void {
    this.filterForm.controls.customer.valueChanges
      .pipe(debounceTime(500))
      .subscribe((search) => {
        if (search != null && typeof search === "string" && search !== "") {
          this.userService.findForAutocomplete(search, "CUSTOMER",
            new PaginationDto(0, 10, "ASC", "fullname")
          ).subscribe(value => {
            this.customers = value.content
          })
        } else if (search === "") {
          this.filterForm.controls.customer.setValue(null)
          this.customers = []
        }
      })

    this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        if (this.filterForm.valid) {
          this.search()
        }
      })

    this.search()
  }

  search() {
    this.genericOrderService
      .search({
        orderLevel: this.filterForm.value.orderLevel!,
        orderType: this.filterForm.value.orderType!,
        orderStatus: this.filterForm.value.orderStatus!,
        customerId: (this.filterForm.value.customer as User).id || '',
      }, this.pagination)
      .subscribe((result) => {
        this.actualPage.next(result);
      })
  }


  protected readonly orderStatus = orderStatus;
  protected readonly orderLevel = orderLevel;
  protected readonly orderTypes = orderTypes;
  columnsToShow = ['id', 'customer', 'status','type', 'level','actions'];

  sortChange($event: Sort) {
    this.pagination.page = 0;
    if ($event.active && $event.direction) {
      this.pagination.sortBy = $event.active;
      this.pagination.sortDirection = $event.direction.toUpperCase();
    } else {
      this.pagination.sortBy = "id";
      this.pagination.sortDirection = "DESC";
    }
    this.search();
  }

  onPageChange($event: PageEvent) {
    this.pagination.page = $event.pageIndex;
    this.pagination.pageSize = $event.pageSize;
    this.search();
  }

}
