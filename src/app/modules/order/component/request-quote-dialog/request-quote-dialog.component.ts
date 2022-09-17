import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Order} from "../../../shared/model/order";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import {OrderService} from "../../../shared/services/order.service";
import {GenerateRequestQuoteDto} from "../../../shared/messages/order/generate-request-quote.dto";
import {saveAs} from "file-saver";
import {RequestQuote} from "../../../shared/model/request-quote";
import {Newspaper} from "../../../shared/model/newspaper";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-request-quote-dialog',
  templateUrl: './request-quote-dialog.component.html',
  styleUrls: ['./request-quote-dialog.component.scss']
})
export class RequestQuoteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RequestQuoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order, requestQuoteToEdit: RequestQuote },
    private orderService: OrderService,
    private matDialog: MatDialog
  ) {
  }

  requestQuoteForm = new FormGroup({
    header: new FormControl("<div></div>"),
    priceReplacements: new FormArray<FormGroup>([]),
    signature: new FormControl("<div></div>"),
  })
  initEditor = {plugins: 'link image', height: '200px'};

  get filteredPriceReplacements() {
    return this.data.requestQuoteToEdit.requestQuotePriceReplacements.filter(value => {
      return this.data.requestQuoteToEdit.order.orderElements.map(value => value.newspaper.id).includes(value.newspaper.id)
    })
  };

  get total() {
    return this.requestQuoteForm.controls
      .priceReplacements
      .value
      .map(value => value.priceReplacement)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  };

  get isEdit() {
    return !!this.data.requestQuoteToEdit
  }


  ngOnInit(): void {
    this.addPriceReplacementFormControl();
  }

  addPriceReplacementFormControl() {
    if (this.isEdit) {
      this.requestQuoteForm.controls.header.setValue(this.data.requestQuoteToEdit.header)
      this.requestQuoteForm.controls.signature.setValue(this.data.requestQuoteToEdit.signature)
      this.data.requestQuoteToEdit.requestQuotePriceReplacements.forEach((value, index) => {
        this.requestQuoteForm.controls.priceReplacements
          .push(new FormGroup({
              priceReplacement: new FormControl(value.priceReplacement, Validators.required),
              newspaperId: new FormControl(value.newspaper.id, Validators.required)
            })
          )
      })
    } else {
      this.data.order.orderElements.forEach((value, index) => {
        this.requestQuoteForm.controls.priceReplacements
          .push(new FormGroup({
              priceReplacement: new FormControl(value.newspaper.costSell * value.contentNumber, Validators.required),
              newspaperId: new FormControl(value.newspaper.id, Validators.required)
            })
          )
      })
    }

  }

  downloadRequestQuote(format: string) {
    if (this.requestQuoteForm.valid) {
      let value = this.requestQuoteForm.value as GenerateRequestQuoteDto;

      if (!this.isEdit) {
        value.orderId = this.data.order.id;
      } else {
        value.requestQuoteId = this.data.requestQuoteToEdit.id
        value.orderId = this.data.requestQuoteToEdit.order.id
      }

      this.orderService.generateRequestQuote(value, format).subscribe((response: HttpResponse<Blob>) => {
        saveAs(response.body!, this.data.order?.name || this.data.requestQuoteToEdit.order.name + "_preventivo." + format)
        if (!this.isEdit) {
          this.dialogRef.close()
        }
      })
    }
  }

  findContentNumberByRequestQuotePriceReplacement(requestQuotePriceReplacement: { id: number; priceReplacement: number; newspaper: Newspaper }): number {
    return this.data.requestQuoteToEdit.order.orderElements.find(oe => {
      return oe.newspaper.id === requestQuotePriceReplacement.newspaper.id
    })!.contentNumber
  }

  deleteRequestQuote() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: "Sei sicuro di voler eliminare il preventivo?"
    }).afterClosed().subscribe((answer) => {
      if (answer) {
        this.orderService.deleteRequestQuote(this.data.requestQuoteToEdit.id).subscribe(() => {
          this.dialogRef.close()
        })
      }
    })

  }
}
