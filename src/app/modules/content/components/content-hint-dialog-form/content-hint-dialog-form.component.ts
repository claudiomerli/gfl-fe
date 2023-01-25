import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Content} from "../../../shared/messages/content/content";
import {FormControl} from "@angular/forms";
import {SaveAttachmentDto} from "../../../shared/messages/attachment/save-attachment.dto";
import {Attachment} from "../../../shared/messages/common/attachment";
import {ProjectService} from "../../../shared/services/project.service";
import {zip} from "rxjs";
import {ContentService} from "../../../shared/services/content.service";
import {switchMap, tap} from "rxjs/operators";
import {AttachmentService} from "../../../shared/services/attachment.service";
import {saveAs} from "file-saver";
import {Project} from "../../../shared/messages/project/project";

@Component({
  selector: 'app-content-hint-dialog-form',
  templateUrl: './content-hint-dialog-form.component.html',
  styleUrls: ['./content-hint-dialog-form.component.scss']
})
export class ContentHintDialogFormComponent implements OnInit {

  hintBody = new FormControl<string | null>(null);
  content!: Content;
  project!: Project

  constructor(
    public dialogRef: MatDialogRef<ContentHintDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public contentId: number,
    private projectService: ProjectService,
    private contentService: ContentService,
    private attachmentService: AttachmentService
  ) {
  }

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent() {
    this.contentService.findById(this.contentId)
      .subscribe(content => {
        this.content = content;
        this.hintBody.setValue(this.content.hint.body)
        this.projectService.findById(content.projectCommission.projectId)
          .subscribe(project => {
            this.project = project;
          })
      })
  }

  save() {
    this.saveContentHintObservable().subscribe(() => {
      this.loadContent();
    })
  }

  saveContentHintObservable() {
    return this.projectService.updateProjectCommissionHint(this.content.projectCommission.projectId, this.content.projectCommission.id, {
      body: this.hintBody.value
    })
  }

  onUploadProjectHintAttachments(base64s: SaveAttachmentDto[]) {
    zip(...base64s.map(file =>
      this.projectService.uploadProjectCommissionHintAttachment(this.content.projectCommission.projectId, this.content.projectCommission.id, file)
    )).pipe(switchMap(() => this.saveContentHintObservable()))
      .subscribe(() => {
        this.loadContent();
      })
  }

  onRemovedAttachment(attachment: Attachment) {
    this.projectService.deleteProjectCommissionHintAttachment(this.content.projectCommission.projectId, this.content.projectCommission.id, attachment.id)
      .pipe(switchMap(() => this.saveContentHintObservable()))
      .subscribe(() => {
        this.loadContent();
      })
  }

  download(attachment: Attachment) {
    this.attachmentService.downloadAttachment(attachment)
      .subscribe(value => {
        saveAs(value, attachment.filename)
      })
  }
}
