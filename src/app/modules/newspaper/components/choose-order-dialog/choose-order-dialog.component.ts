import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../../shared/services/order.service";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {Order} from "../../../shared/messages/order/order";
import {SaveOrderElementDto} from "../../../shared/messages/order/save-order.dto";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";

@Component({
  selector: 'app-choose-order-dialog',
  templateUrl: './choose-order-dialog.component.html',
  styleUrls: ['./choose-order-dialog.component.scss']
})
export class ChooseOrderDialogComponent implements OnInit {

  orders: Order[] = []

  constructor(
    public dialogRef: MatDialogRef<ChooseOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Newspaper,
    public orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.orderService.find(
      {status: "DRAFT", excludeOrderPack: true, newspaperIds: []},
      PaginationDto.build(0, 2147483647))
      .subscribe((orderPage) => {
        this.orders = orderPage.content.filter(value => !value.orderElements.find(oe => oe.newspaper.id === this.data.id));
      })
  }

  chooseOrderForm = new FormGroup({
    order: new FormControl<Order | null>(null, Validators.required),
    quantity: new FormControl<number>(0, [Validators.min(1)])
  })

  onNoClick() {
    this.dialogRef.close()
  }

  onConfirm() {
    if (this.chooseOrderForm.valid) {
      const saveOrderElement: SaveOrderElementDto = {
        newspaperId: this.data.id,
        contentNumber: this.chooseOrderForm.value.quantity!
      }
      this.dialogRef.close({
        orderId: this.chooseOrderForm.value.order?.id,
        saveOrderElement
      })
    }

  }
}
