import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-newspaper-description-dialog',
  templateUrl: './newspaper-description-dialog.component.html',
  styleUrls: ['./newspaper-description-dialog.component.scss']
})
export class NewspaperDescriptionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewspaperDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Newspaper,
    private newspaperService: NewspaperService
  ) {
  }


  description = new FormControl<string>('');

  onNoClick() {
    this.dialogRef.close()
  }

  ngOnInit(): void {
    this.newspaperService.getDescription(this.data.id).subscribe(value => {
      this.description.setValue(value.description)
    })
  }

  save() {
    this.newspaperService.saveDescription(this.data.id,
      {
        description: this.description.value
      }
    ).subscribe()
  }
}
