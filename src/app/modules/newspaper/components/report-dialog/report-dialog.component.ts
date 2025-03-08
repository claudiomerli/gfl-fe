import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {FormControl} from "@angular/forms";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Newspaper[],
    private newspaperService: NewspaperService
  ) {
  }

  costSellFormControls: FormControl<number | null>[] = []

  ngOnInit(): void {
    this.costSellFormControls = this.data.map(value => new FormControl<number>(value.costSell))
  }

  get totalCostEach() {
    return this.data.map(value => value.costEach).reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  get totalCostSell() {
    return this.costSellFormControls.map(value => value.value)
      .reduce((previousValue, currentValue) => (previousValue || 0) + (currentValue || 0), 0);
  }

  get difference() {
    return (this.totalCostSell || 0) - this.totalCostEach;
  }

  onNoClick() {
    this.dialogRef.close()
  }

  export() {
    this.newspaperService.exportReport(
      this.data.map((value, index) => ({
        id: value.id,
        costSell: this.costSellFormControls[index].value || 0
      }))).subscribe(value => {
      saveAs(value, "ExportReport.xlsx")
    })
  }
}
