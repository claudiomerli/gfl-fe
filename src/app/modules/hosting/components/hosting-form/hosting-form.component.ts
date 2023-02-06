import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SaveHostingDto} from "../../../shared/messages/hosting/save-hosting.dto";
import {Hosting} from "../../../shared/messages/hosting/hosting";

@Component({
  selector: 'app-hosting-form',
  templateUrl: './hosting-form.component.html',
  styleUrls: ['./hosting-form.component.scss']
})
export class HostingFormComponent implements OnInit, OnChanges {

  constructor() {
  }

  @Output() formSubmit = new EventEmitter<SaveHostingDto>();
  @Input() hostingToEdit!: Hosting;

  hostingForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    url: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl(""),
    notes: new FormControl(""),
  })
  hide: boolean = true;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hostingToEdit.currentValue) {
      this.hostingForm.patchValue({
        name: this.hostingToEdit.name!,
        url: this.hostingToEdit.url!,
        username: this.hostingToEdit.username!,
        password: this.hostingToEdit.password!,
        notes: this.hostingToEdit.notes!,
      })
    }
  }

  onSubmit() {
    if (this.hostingForm.valid) {
      this.formSubmit.emit({
        name: this.hostingForm.value.name!,
        url: this.hostingForm.value.url!,
        username: this.hostingForm.value.username!,
        password: this.hostingForm.value.password!,
        notes: this.hostingForm.value.notes!,
      })
    }
  }
}
