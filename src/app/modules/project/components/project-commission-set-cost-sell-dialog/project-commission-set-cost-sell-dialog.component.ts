import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectCommission} from "../../../shared/messages/project/project";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-project-commission-set-cost-sell-dialog',
  templateUrl: './project-commission-set-cost-sell-dialog.component.html',
  styleUrls: ['./project-commission-set-cost-sell-dialog.component.scss']
})
export class ProjectCommissionSetCostSellDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ProjectCommissionSetCostSellDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectCommission,
  ) {
  }

  costSell = new FormControl<number>(0, [Validators.required]);

  ngOnInit(): void {
    this.costSell.setValue(this.data.costSell || this.data.newspaper.costSell)
  }

  save() {
    this.dialogRef.close(this.costSell.value);
  }
}
