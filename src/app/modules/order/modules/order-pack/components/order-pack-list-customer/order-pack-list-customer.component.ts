import {Component, OnInit} from '@angular/core';
import {OrderPackService} from "../../../../../shared/services/order-pack.service";
import {PaginationDto} from "../../../../../shared/messages/pagination.dto";
import {PageResponseDto} from "../../../../../shared/messages/page-response.dto";
import {OrderPack} from "../../../../../shared/model/order-pack";
import {OrderService} from "../../../../../shared/services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-pack-list-customer',
  templateUrl: './order-pack-list-customer.component.html',
  styleUrls: ['./order-pack-list-customer.component.scss']
})
export class OrderPackListCustomerComponent implements OnInit {

  public orderPacks!: PageResponseDto<OrderPack>;

  constructor(private orderPackService: OrderPackService, private orderService: OrderService, private router: Router) {
  }

  ngOnInit(): void {
    this.orderPackService.find({
      globalSearch: "",
      newspaperIds: []
    }, PaginationDto.buildMaxValueOnePage()).subscribe((result) => {
      this.orderPacks = result;
    })
  }

  createOrder(orderPack: OrderPack) {
    this.orderService
      .generateFromOrderPack(orderPack)
      .subscribe(value => {
        this.router.navigate(['/orders', value.id])
      })
  }
}
