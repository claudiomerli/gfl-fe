import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Order} from "../../../shared/model/order";

@Component({
  selector: 'app-request-quote-dialog',
  templateUrl: './request-quote-dialog.component.html',
  styleUrls: ['./request-quote-dialog.component.scss']
})
export class RequestQuoteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RequestQuoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public order: Order,
  ) { }

  ngOnInit(): void {
  }

}
