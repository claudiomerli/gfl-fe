import {Component, OnInit} from '@angular/core';
import {MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {ProjectService} from "../../../shared/services/project.service";
import {ContentHintTemplateService} from "../../../shared/services/content-hint-template.service";
import {ContentHintTemplate} from "../../../shared/messages/project/content-hint-template";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-content-hint-template-dialog-form',
  templateUrl: './content-hint-template-dialog-form.component.html',
  styleUrls: ['./content-hint-template-dialog-form.component.scss']
})
export class ContentHintTemplateDialogFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContentHintTemplateDialogFormComponent>,
    public contentHintTemplateService: ContentHintTemplateService
  ) {
  }

  contentHintTemplates: ContentHintTemplate[] = []
  newTemplateBody = new FormControl("");

  ngOnInit(): void {
    this.refresh()
  }

  save() {
    this.contentHintTemplateService.save({
      body: this.newTemplateBody.value!
    }).subscribe(() => {
      this.newTemplateBody.setValue("")
      this.refresh()
    })
  }

  refresh() {
    this.contentHintTemplateService.findAll()
      .subscribe(value => {
        this.contentHintTemplates = value;
      });
  }

  delete($event: MouseEvent, id: number) {
    $event.stopPropagation()
    this.contentHintTemplateService.delete(id)
      .subscribe(() => {
        this.refresh()
      })
  }

  templateSelected(contentHintTemplate: ContentHintTemplate) {
    this.dialogRef.close(contentHintTemplate.body)
  }
}
