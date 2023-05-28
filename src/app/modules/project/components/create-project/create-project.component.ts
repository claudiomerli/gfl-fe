import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  name = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<CreateProjectComponent>
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    if (this.name.valid) {
      this.dialogRef.close(this.name.value)
    }
  }
}
