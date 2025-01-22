import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectCommission} from "../../../shared/messages/project/project";
import {projectCommissionStatus} from "../../../shared/utils/utils";

@Component({
  selector: 'app-project-commission-history-dialog',
  templateUrl: './project-commission-history-dialog.component.html',
  styleUrls: ['./project-commission-history-dialog.component.scss']
})
export class ProjectCommissionHistoryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProjectCommissionHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectCommission,
  ) {}

  projectCommissionStatus = projectCommissionStatus
  ngOnInit(): void {

  }


}
