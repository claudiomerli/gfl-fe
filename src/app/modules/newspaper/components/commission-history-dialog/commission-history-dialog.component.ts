import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectCommission} from "../../../shared/messages/project/project";
import {projectCommissionStatus} from "../../../shared/utils/utils";

@Component({
  selector: 'app-commission-history-dialog',
  templateUrl: './commission-history-dialog.component.html',
  styleUrls: ['./commission-history-dialog.component.scss']
})
export class CommissionHistoryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CommissionHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectCommission,
  ) {}

  projectCommissionStatus = projectCommissionStatus
  ngOnInit(): void {

  }


}
