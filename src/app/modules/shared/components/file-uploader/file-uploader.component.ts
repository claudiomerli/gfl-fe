import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttachmentService} from "../../services/attachment.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input() fieldLabel?: string
  @Input() existentfile?: {
    id: number,
    filename: string,
    contentType: string
  } | undefined

  @Output() loadFile = new EventEmitter<{
    filename: string,
    contentType: string,
    byte: any
  }>();

  @Output() removeFile = new EventEmitter<void>()

  constructor(private attachmentService: AttachmentService) {
  }

  ngOnInit(): void {
  }

  downloadFile() {
    if (this.existentfile?.id)
      this.attachmentService
        .downloadFile(this.existentfile?.id)
        .subscribe(response => {
          saveAs(response.body, this.existentfile?.filename)
        })
  }

  onLoadFile($event: any) {
    const fileList = ($event.target.files as FileList);
    if (fileList.length > 0) {
      let file = fileList[0];
      const reader = new FileReader();

      reader.readAsDataURL(file)
      reader.onload = (() => {
        if (reader.result) {
          const result = (reader.result as string)
          const event = {
            byte: result.substring(result.indexOf("base64,") + 7),
            contentType: file.type,
            filename: file.name
          }
          this.loadFile.emit(event)
        }
      })
    }
  }

  onRemoveFile() {
    this.existentfile = undefined;
    this.removeFile.emit()
  }
}
