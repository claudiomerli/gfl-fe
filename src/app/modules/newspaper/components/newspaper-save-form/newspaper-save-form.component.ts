import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {SaveNewspaperDto} from "../../../shared/messages/newspaper/save-newspaper.dto";
import {Newspaper} from "../../../shared/messages/newspaper/newspaper";
import {Topic} from "../../../shared/messages/newspaper/topic";
import {TopicService} from "../../../shared/services/topic.service";
import {Options} from "@angular-slider/ngx-slider";
import {
  getPointerColor,
  getSelectionBarColor, regionalGeolocation,
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
    tf: new FormControl(50, [Validators.max(100), Validators.min(0)]),
    cf: new FormControl(50, [Validators.max(100), Validators.min(0)]),
    dr: new FormControl(50, [Validators.max(100), Validators.min(0)]),
    traffic: new FormControl(0, [Validators.max(50000000), Validators.min(0)]),
    costEach: new FormControl(0, [Validators.required]),
    costSell: new FormControl(0, [Validators.required]),
    email: new FormControl('', [Validators.email]),
    regionalGeolocalization: new FormControl<string | null>(null, [Validators.required]),
    note: new FormControl<string | null>(null),
    topics: new FormControl<number[]>([]),
    hidden: new FormControl(false),
    sensitiveTopics: new FormControl<boolean | null>(null),
    warning: new FormControl<boolean | null>(null),
    nofollow: new FormControl<boolean |null>(null)
  })

  sliderOptions: Options = {
    floor: 0,
    ceil: 100,
    getPointerColor: getPointerColor,
    getSelectionBarColor: getSelectionBarColor,
    translate: translatePercentage
  };

  regionalGeolocalizzation = regionalGeolocation;

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
        tf: this.newspaperToEdit.tf,
        cf: this.newspaperToEdit.cf,
        dr: this.newspaperToEdit.dr,
        traffic: this.newspaperToEdit.traffic,
        regionalGeolocalization: this.newspaperToEdit.regionalGeolocalization,
        topics: this.newspaperToEdit.topics.map(value => value.id),
        hidden: this.newspaperToEdit.hidden,
        sensitiveTopics: this.newspaperToEdit.sensitiveTopics,
        warning: this.newspaperToEdit.warning,
        nofollow: this.newspaperToEdit.nofollow
      });
    }
  }

  onSubmit() {
    if (this.saveNewspaperForm.valid) {
      this.formSubmit.emit(this.saveNewspaperForm.value as SaveNewspaperDto);
    }
  }
}
