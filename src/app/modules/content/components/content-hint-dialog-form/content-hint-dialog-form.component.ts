import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
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
import {
  ContentHintTemplateDialogFormComponent
} from "../content-hint-template-dialog-form/content-hint-template-dialog-form.component";
import {Store} from "@ngxs/store";
import {AuthenticationState} from "../../../store/state/authentication-state";

@Component({
  selector: 'app-content-hint-dialog-form',
  templateUrl: './content-hint-dialog-form.component.html',
  styleUrls: ['./content-hint-dialog-form.component.scss']
})
export class ContentHintDialogFormComponent implements OnInit, OnDestroy {


  hintBody = new FormControl<string | null>(null);
  content!: Content;
  project!: Project
  intervalId: any;

  constructor(
    public dialogRef: MatDialogRef<ContentHintDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public contentId: number,
    private projectService: ProjectService,
    private contentService: ContentService,
    private attachmentService: AttachmentService,
    private matDialog: MatDialog,
    private store: Store
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

        let user = this.store.selectSnapshot(AuthenticationState.user);
        if (["ADMIN", "CHIEF_EDITOR"].includes(user?.role!)) {
          this.intervalId = setInterval(() => {
            this.saveContentHintObservable(true).subscribe()
          }, 5000);
        }
      })
  }

  save() {
    this.saveContentHintObservable().subscribe(() => {
      this.loadContent();
    })
  }


  saveContentHintObservable(withoutSpinner?: boolean) {
    return this.projectService.updateProjectCommissionHint(this.content.projectCommission.projectId, this.content.projectCommission.id, {
      body: this.hintBody.value
    }, withoutSpinner)
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

  openContentHintTemplateDialog() {
    this.matDialog.open(ContentHintTemplateDialogFormComponent)
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.hintBody.setValue(response)
        }
      })
  }

  ngOnDestroy(): void {
    if (this.intervalId)
      clearInterval(this.intervalId)
  }
}
