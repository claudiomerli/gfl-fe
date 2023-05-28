import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";

@Component({
  selector: 'app-order-draft-dialog',
  templateUrl: './order-draft-dialog.component.html',
  styleUrls: ['./order-draft-dialog.component.scss']
})
export class OrderDraftDialogComponent implements OnInit {

  createOrderDraftForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<OrderDraftDialogComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close()
  }

  onConfirm() {
    if (this.createOrderDraftForm.valid) {
      this.dialogRef.close(this.createOrderDraftForm.value)
    }
  }
}
