import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {SaveNewspaperDto} from "../../../shared/messages/newspaper/save-newspaper.dto";
import {Newspaper} from "../../../shared/model/newspaper";
import {Topic} from "../../../shared/model/topic";
import {TopicService} from "../../../shared/services/topic.service";
import {Options} from "@angular-slider/ngx-slider";
import {
  getPointerColor,
  getSelectionBarColor, regionalGeolocalizzation,
  translatePercentage
} from "../../../shared/utils/utils";

@Component({
  selector: 'app-newspaper-save-form',
  templateUrl: './newspaper-save-form.component.html',
  styleUrls: ['./newspaper-save-form.component.scss']
})
export class NewspaperSaveFormComponent implements OnInit {

  @Input() onSaving = false;
  @Input() newspaperToEdit: Newspaper | undefined;
  @Output() formSubmit = new EventEmitter<SaveNewspaperDto>();

  topicList = [] as Array<Topic>;
  saveNewspaperForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    ip: new FormControl<string | null>(null, [Validators.pattern(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)]),
    za: new FormControl(50, [Validators.max(100), Validators.min(0)]),
    purchasedContent: new FormControl(0, [Validators.required]),
    costEach: new FormControl(0, [Validators.required]),
    costSell: new FormControl(0, [Validators.required]),
    email: new FormControl('', [Validators.email]),
    regionalGeolocalization: new FormControl<string | null>(null, [Validators.required]),
    note: new FormControl<string | null>(null),
    topics: new FormControl<number[]>([]),
  })

  zaSliderOptions: Options = {
    floor: 0,
    ceil: 100,
    getPointerColor: getPointerColor,
    getSelectionBarColor: getSelectionBarColor,
    translate: translatePercentage
  };

  regionalGeolocalizzation = regionalGeolocalizzation;

  constructor(private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.topicService.findAll().subscribe(data => {
      this.topicList = data;
    });

    if (this.newspaperToEdit) {
      this.saveNewspaperForm.patchValue({
        email: this.newspaperToEdit.email,
        costEach: this.newspaperToEdit.costEach,
        costSell: this.newspaperToEdit.costSell,
        ip: this.newspaperToEdit.ip,
        name: this.newspaperToEdit.name,
        note: this.newspaperToEdit.note,
        za: this.newspaperToEdit.za,
        purchasedContent: this.newspaperToEdit.purchasedContent,
        regionalGeolocalization: this.newspaperToEdit.regionalGeolocalization,
        topics: this.newspaperToEdit.topics.map(value => value.id)
      });
    }
  }

  onSubmit() {
    if (this.saveNewspaperForm.valid) {
      this.formSubmit.emit(this.saveNewspaperForm.value as SaveNewspaperDto);
    }
  }
}
