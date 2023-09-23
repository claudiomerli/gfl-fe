import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VideoTemplate} from "../../../shared/messages/video-template/video-template";
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {SaveVideoTemplateDto} from "../../../shared/messages/video-template/save-video-template.dto";

@Component({
  selector: 'app-video-template-card',
  templateUrl: './video-template-card.component.html',
  styleUrls: ['./video-template-card.component.scss']
})
export class VideoTemplateCardComponent implements OnInit {

  @Input() videoTemplate?: VideoTemplate
  @Output() delete = new EventEmitter();
  @Output() save = new EventEmitter<SaveVideoTemplateDto>();


  form = new FormGroup({
    url: new FormControl<string>(''),
    name: new FormControl<string>(''),
    fields: new FormControl<string[]>([])
  })

  add($event: MatChipInputEvent) {
    if ($event.value)
      this.form.controls.fields.setValue([...this.form.value.fields!, $event.value])
    $event.chipInput.clear();
  }

  remove(field: string) {
    this.form.controls.fields.setValue(this.form.value.fields!.filter(fieldElement => fieldElement != field))
  }

  ngOnInit(): void {
    this.form.patchValue({
      url: this.videoTemplate?.url,
      fields: this.videoTemplate?.fields.map(value => value.field),
      name: this.videoTemplate?.name
    })
  }

  onDelete() {
    this.delete.emit()
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit({
        url: this.form.value.url!,
        name: this.form.value.name!,
        type: this.videoTemplate!.type,
        fields: this.form.value.fields!.map(value => ({name: value}))
      })
    }
  }
}
