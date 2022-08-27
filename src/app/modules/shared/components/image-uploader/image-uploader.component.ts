import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  constructor() {
  }

  @Input() imageBase64: string | undefined = undefined
  @Input() text: string | undefined = undefined

  @ViewChild("fileInput") fileInput!: ElementRef

  @Output() imageSelected = new EventEmitter<string>()


  ngOnInit(): void {
  }

  openChooseFileDialog() {
    console.log(this.imageBase64)
    if (this.imageBase64 == undefined || this.imageBase64 == "") {
      this.fileInput.nativeElement.click()
    }
  }

  fileSelected($event: any) {
    console.log($event)
    const reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = () => {
      this.imageBase64 = reader.result as string;
      this.imageSelected.emit(reader.result as string)
    };
    reader.onerror = error => {
      console.error(error)
    };

  }

  remove($event: MouseEvent) {
    $event.stopPropagation()
    this.imageBase64 = undefined;
    this.imageSelected.emit(undefined)
    this.fileInput.nativeElement.value = null
  }
}
