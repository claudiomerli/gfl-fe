import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContentHint} from "../../messages/content/content-hint";
import {NgxDropzoneChangeEvent} from "ngx-dropzone";
import {FormControl} from "@angular/forms";
import {Attachment} from "../../messages/common/attachment";
import {SaveAttachmentDto} from "../../messages/attachment/save-attachment.dto";

@Component({
  selector: 'app-content-hint-form',
  templateUrl: './content-hint-form.component.html',
  styleUrls: ['./content-hint-form.component.scss']
})
export class ContentHintFormComponent implements OnInit {

  constructor() {
  }

  @Input() bodyFormControl! : FormControl<string | null>;

  @Input() hint!: ContentHint

  @Output() addedFiles = new EventEmitter<SaveAttachmentDto[]>()
  @Output() removedFile = new EventEmitter<Attachment>()

  onSelect(event: NgxDropzoneChangeEvent) {
    Promise.all(event.addedFiles.map(file =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          resolve({
              filename: file.name,
              body: (reader.result as string).split(',')[1]
            }
          )
        })
        reader.readAsDataURL(file);
      }))).then(base64s => {
      this.addedFiles.emit(base64s as SaveAttachmentDto[])
    })


  }

  onRemove(event: Attachment) {
    this.removedFile.emit(event)
  }

  ngOnInit(): void {
  }

}
