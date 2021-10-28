import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SaveNewspaperDto} from "../../../shared/messages/newspaper/save-newspaper.dto";
import {Newspaper} from "../../../shared/model/newspaper";

@Component({
  selector: 'app-newspaper-save-form',
  templateUrl: './newspaper-save-form.component.html',
  styleUrls: ['./newspaper-save-form.component.scss']
})
export class NewspaperSaveFormComponent implements OnInit {

  @Input()  onSaving = false;

  @Input() newspaperToEdit: Newspaper = new Newspaper()
  @Output() formSubmit = new EventEmitter<SaveNewspaperDto>();

  constructor() {
  }

  ngOnInit(): void {
    this.saveNewspaperForm.patchValue(this.newspaperToEdit)
  }

  saveNewspaperForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    purchasedContent: new FormControl(''),
    costEach: new FormControl(''),
    costSell: new FormControl(''),
    email: new FormControl(''),
    regionalGeolocalization: new FormControl(''),
    topic: new FormControl(''),
  })

  onSubmit() {
    this.formSubmit.emit(this.saveNewspaperForm.value as SaveNewspaperDto)
  }

}
