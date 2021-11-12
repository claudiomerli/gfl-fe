import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {ContentService} from "../../../shared/services/content.service";
import {Content} from "../../../shared/model/content";
import {saveAs} from 'file-saver';
import {ContentSaveEvent} from "../../components/content-form/content-form.component";

@Component({
  selector: 'app-content-update',
  templateUrl: './content-update.component.html',
  styleUrls: ['./content-update.component.scss']
})
export class ContentUpdateComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private contentService: ContentService) {
  }

  contentToUpdate: undefined | Content;

  ngOnInit(): void {
    this.loadContent();
  }

  private loadContent(): void {
    this.activatedRoute
      .params
      .subscribe(params => {
        this.contentService
          .findById(params.id)
          .subscribe(content => {
            this.contentToUpdate = content
          })
      })
  }

  onSubmit($event: ContentSaveEvent, reload: boolean) {
    if (this.contentToUpdate)
      this.contentService
        .update(this.contentToUpdate.id, $event.value, $event.noSendEmail)
        .subscribe(() => {
          if(reload) {
            this.loadContent();
          }
        })
  }

  exportDocx() {
    if (this.contentToUpdate)
      this.contentService.exportDocx(this.contentToUpdate.id)
        .subscribe((blob) => {
          saveAs(blob.body as Blob, this.contentToUpdate?.id + ".docx")
        })
  }

  exportPdf() {
    if (this.contentToUpdate)
      this.contentService.exportPdf(this.contentToUpdate.id)
        .subscribe((blob) => {
          saveAs(blob.body as Blob, this.contentToUpdate?.id + ".pdf")
        })
  }

  deliver() {
    this.contentService.deliver(this.contentToUpdate?.id)
      .subscribe(() => {
          this.loadContent();
      })
  }

  changeProjectStatus(content: Content) {
    this.contentService.changeProjectStatus(content)
      .subscribe(() => {
        this.loadContent();
      })
  }
}
