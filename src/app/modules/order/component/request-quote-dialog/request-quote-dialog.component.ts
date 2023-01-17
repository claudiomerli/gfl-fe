import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Order} from "../../../shared/model/order";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import {OrderService} from "../../../shared/services/order.service";
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

  order?: Order;
  requestQuoteToEdit?: RequestQuote;

  requestQuoteForm = new FormGroup({
    header: new FormControl(),
    priceReplacements: new FormArray<FormGroup<{ priceReplacement: any, newspaperId: any }>>([]),
    signature: new FormControl(),
  })
  initEditor = {plugins: 'link image', height: '200px'};

  get filteredPriceReplacements() {
    return this.requestQuoteToEdit!.requestQuotePriceReplacements.filter(value => {
      return this.requestQuoteToEdit!.order.orderElements.map(value => value.newspaper.id).includes(value.newspaper.id)
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
    return !!this.requestQuoteToEdit
  }


  ngOnInit(): void {
    this.order = this.data.order
    this.requestQuoteToEdit = this.data.requestQuoteToEdit
    this.setupForm();
  }

  setupForm() {
    this.requestQuoteForm = new FormGroup({
      header: new FormControl("<div></div>"),
      priceReplacements: new FormArray<FormGroup>([]),
      signature: new FormControl("<div></div>"),
    });

    if (this.isEdit) {
      this.requestQuoteForm.controls.header.setValue(this.requestQuoteToEdit!.header)
      this.requestQuoteForm.controls.signature.setValue(this.requestQuoteToEdit!.signature)
      this.requestQuoteToEdit!.requestQuotePriceReplacements.forEach((value, index) => {
        this.requestQuoteForm.controls.priceReplacements
          .push(new FormGroup({
              priceReplacement: new FormControl(value.priceReplacement, Validators.required),
              newspaperId: new FormControl(value.newspaper.id, Validators.required)
            })
          )
      })
    } else {
      this.order!.orderElements.forEach((value, index) => {
        this.requestQuoteForm.controls.priceReplacements
          .push(new FormGroup({
              priceReplacement: new FormControl(value.newspaper.costSell * value.contentNumber, Validators.required),
              newspaperId: new FormControl(value.newspaper.id, Validators.required)
            })
          )
      })
    }

  }

  findContentNumberByRequestQuotePriceReplacement(requestQuotePriceReplacement: { id: number; priceReplacement: number; newspaper: Newspaper }): number {
    return this.requestQuoteToEdit!.order.orderElements.find(oe => {
      return oe.newspaper.id === requestQuotePriceReplacement.newspaper.id
    })!.contentNumber
  }

  deleteRequestQuote() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: "Sei sicuro di voler eliminare il preventivo?"
    }).afterClosed().subscribe((answer) => {
      if (answer) {
        this.orderService.deleteRequestQuote(this.requestQuoteToEdit!.order.id, this.requestQuoteToEdit!.id).subscribe(() => {
          this.dialogRef.close()
        })
      }
    })

  }

  buildDto() {
    let value = this.requestQuoteForm.value;
    return {
      header: value.header,
      signature: value.signature,
      priceReplacements: value.priceReplacements?.map(pr => {
        return {
          priceReplacement: pr.priceReplacement as number,
          newspaperId: pr.newspaperId as number
        }
      })!
    }
  }

  generateRequestQuote(format: string) {
    this.orderService.generateRequestQuote(this.requestQuoteToEdit!.order.id, this.requestQuoteToEdit!.id, format)
      .subscribe((response: Blob) => {
        saveAs(response, (this.order?.name || this.requestQuoteToEdit?.order.name) + "_preventivo." + format)
        if (!this.isEdit) {
          this.dialogRef.close()
        }
      })
  }

  updateRequestQuote() {
    if (this.requestQuoteForm.valid) {
      if (this.requestQuoteForm.valid) {
        this.orderService.updateRequestQuote(this.requestQuoteToEdit!.order.id, this.buildDto(), this.requestQuoteToEdit!.id).subscribe(response => {
          this.requestQuoteToEdit = response;
          this.setupForm();
        })
      }
    }
  }

  createRequestQuote() {
    if (this.requestQuoteForm.valid) {
      this.orderService.createRequestQuote(this.order!.id, this.buildDto()).subscribe(response => {
        this.requestQuoteToEdit = response;
        this.setupForm();
      })
    }
  }
}
