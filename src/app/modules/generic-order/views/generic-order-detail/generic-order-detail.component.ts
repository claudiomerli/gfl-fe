import {Component, OnInit} from '@angular/core';
import {GenericOrderService} from "../../../shared/services/generic-order.service";
import {ActivatedRoute} from "@angular/router";
import {GenericOrder} from "../../../shared/messages/generic-order/generic-order";
import {orderLevel, orderStatus, orderTypes} from "../../../shared/utils/utils";
import {SecondLevelGenericOrder} from "../../../shared/messages/generic-order/second-level-generic-order";
import {VideoOrder} from "../../../shared/messages/generic-order/video-order";

@Component({
  selector: 'app-generic-order-detail',
  templateUrl: './generic-order-detail.component.html',
  styleUrls: ['./generic-order-detail.component.scss']
})
export class GenericOrderDetailComponent implements OnInit {
  order?: GenericOrder;

  constructor(private genericOrderService: GenericOrderService, private activatedRoute: ActivatedRoute) {
  }

  getSecondLevel(): SecondLevelGenericOrder {
    return this.order as SecondLevelGenericOrder
  }

  getVideo(): VideoOrder {
    return this.order as VideoOrder
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
    this.load(id);
  }

  load(id: number) {
    this.genericOrderService
      .findById(id)
      .subscribe(value => {
        this.order = value;
      })
  }

  protected readonly orderTypes = orderTypes;
  protected readonly orderLevel = orderLevel;
  protected readonly orderStatus = orderStatus;

  approve() {
    if (this.order)
      this.genericOrderService.approve(this.order.id)
        .subscribe(() => {
          this.load(this.order!.id);
        })
  }

  refuse() {
    if (this.order)
      this.genericOrderService.refuse(this.order.id)
        .subscribe(() => {
          this.load(this.order!.id);
        })
  }
}
