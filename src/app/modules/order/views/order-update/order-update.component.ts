import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../shared/services/order.service";
import {SaveOrderDto} from "../../../shared/messages/order/save-order.dto";
import {Order} from "../../../shared/model/order";
import {switchMap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.scss']
})
export class OrderUpdateComponent implements OnInit {

  constructor(private orderService: OrderService,
              private activatedRoute: ActivatedRoute,
              private matDialog: MatDialog,
              private router: Router) {
  }

  orderToEdit?: Order

  ngOnInit(): void {
    let orderId = this.activatedRoute.snapshot.paramMap.get("id");
    this.load(orderId as any)
  }

  load(id: number) {
    this.orderService.findById(id).subscribe(order => {
      this.orderToEdit = order
    })
  }

  updateOrder($event: SaveOrderDto) {
    console.log("update")
    this.orderService.update(this.orderToEdit!.id, $event)
      .subscribe((order) => {
        this.orderToEdit = order
      })
  }

  onApprove() {
    this.orderService.approve(this.orderToEdit!.id).subscribe(() => this.load(this.orderToEdit!.id))
  }

  onCancel() {
    this.orderService.cancel(this.orderToEdit!.id).subscribe(() => this.load(this.orderToEdit!.id))
  }

  sendOrder($event: SaveOrderDto) {
    this.orderService
      .update(this.orderToEdit!.id, $event)
      .pipe(
        switchMap((orderSaved) => this.orderService.send(orderSaved.id))
      )
      .subscribe((order) => {
        this.orderToEdit = order
      })
  }

  onDeleteOrder() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: "Sei sicuro di voler cancellare l'ordine?"
    }).afterClosed().subscribe((answer) => {
      if (answer) {
        this.orderService.deleteOrder(this.orderToEdit?.id!).subscribe(() => {
          this.router.navigate(['/orders'])
        });
      }
    })
  }
}
