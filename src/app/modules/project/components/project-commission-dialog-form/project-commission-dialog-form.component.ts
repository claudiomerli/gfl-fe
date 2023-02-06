import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Project, ProjectCommission} from "../../../shared/messages/project/project";
import {ProjectService} from "../../../shared/services/project.service";
import {SaveProjectCommissionDto} from "../../../shared/messages/project/save-project-commission.dto";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import {projectCommissionStatus} from "../../../shared/utils/utils";

@Component({
  selector: 'app-project-commission-dialog-form',
  templateUrl: './project-commission-dialog-form.component.html',
  styleUrls: ['./project-commission-dialog-form.component.scss']
})
export class ProjectCommissionDialogFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProjectCommissionDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      project: Project,
      projectCommission: ProjectCommission,
      preselectedNewspaper: number
    },
    private projectService: ProjectService,
    private matDialog: MatDialog
  ) {
  }

  projectCommissionStatus = projectCommissionStatus;
  ngOnInit(): void {
  }

  onSaveCommission($event: SaveProjectCommissionDto) {
    if (this.data.projectCommission) {
      this.projectService
        .updateCommission(this.data.project.id, this.data.projectCommission.id, $event)
        .subscribe((result) => {
          this.dialogRef.close(result)
        })
    } else {
      this.projectService
        .saveCommission(this.data.project.id, $event)
        .subscribe((result) => {
          this.dialogRef.close(result)
        })
    }

  }


  onDeleteCommission() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: "Sei sicuro di voler rimuovere la commissione?"
    }).afterClosed()
      .subscribe((answer) => {
        if (answer) {
          this.projectService
            .removeCommission(this.data.project.id, this.data.projectCommission.id)
            .subscribe(result => {
              this.dialogRef.close(true)
            })
        }
      })
  }

  onChangeStatus($event: string) {
    this.matDialog.open(ConfirmDialogComponent, {
      data: "Sei sicuro di voler cambiare stato alla commissione?"
    }).afterClosed()
      .subscribe((answer) => {
        if (answer) {
          this.projectService
            .updateCommissionStatus(this.data.project.id, this.data.projectCommission.id, $event)
            .subscribe((result) => {
              this.dialogRef.close(result)
            })
        }
      })
  }
}
