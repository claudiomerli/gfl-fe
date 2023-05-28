import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../../shared/services/order.service";
import {SaveOrderDto} from "../../../shared/messages/order/save-order.dto";
import {Order} from "../../../shared/messages/order/order";
import {switchMap} from "rxjs/operators";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {RequestQuoteDialogComponent} from "../../component/request-quote-dialog/request-quote-dialog.component";
import {RequestQuote} from "../../../shared/messages/order/request-quote";

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
  requestQuotes: RequestQuote[] = [];
  showRequestQuote = false;

  ngOnInit(): void {
    let orderId = this.activatedRoute.snapshot.paramMap.get("id");
    this.load(orderId as any)
    this.loadRequestQuotes(orderId as any)
  }

  load(id: number) {
    this.orderService.findById(id).subscribe(order => {
      this.orderToEdit = order
    })
  }

  updateOrder($event: SaveOrderDto) {
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

  onSendOrderPack() {
    this.orderService.send(this.orderToEdit?.id!).subscribe((orderSaved) => {
      this.orderToEdit = orderSaved
    })
  }

  onCreateRequestQuote() {
    this.matDialog.open(RequestQuoteDialogComponent, {
      data: {order : this.orderToEdit},
      width: "750px",
      disableClose: true
    }).afterClosed().subscribe(() => {
      this.loadRequestQuotes(this.orderToEdit?.id as any)
    })
  }

  private loadRequestQuotes(orderId: number) {
    return this.orderService.findRequestQuotesById(orderId).subscribe(value => {
      this.requestQuotes = value;
    });
  }

  openRequestQuoteEditDialog(requestQuote: RequestQuote) {
    this.matDialog.open(RequestQuoteDialogComponent,{
      data: {requestQuoteToEdit : requestQuote},
      width: "750px",
      disableClose: true
    }).afterClosed().subscribe(() => {
      this.loadRequestQuotes(this.orderToEdit?.id as any)
    })
  }
}
