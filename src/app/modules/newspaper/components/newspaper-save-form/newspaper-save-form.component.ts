import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {SaveNewspaperDto} from "../../../shared/messages/newspaper/save-newspaper.dto";
import {Newspaper} from "../../../shared/model/newspaper";
import {Topic} from "../../../shared/model/topic";
import {TopicService} from "../../../shared/services/topic.service";

@Component({
  selector: 'app-newspaper-save-form',
  templateUrl: './newspaper-save-form.component.html',
  styleUrls: ['./newspaper-save-form.component.scss']
})
export class NewspaperSaveFormComponent implements OnInit {

  @Input() onSaving = false;

  @Input() newspaperToEdit: Newspaper = new Newspaper()
  @Output() formSubmit = new EventEmitter<SaveNewspaperDto>();

  topicList = [] as Array<Topic>;
  selectedTopicList = [] as Array<Topic>;
  saveNewspaperForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    ip: new UntypedFormControl('',),
    za: new UntypedFormControl('',),
    purchasedContent: new UntypedFormControl('0'),
    costEach: new UntypedFormControl('0.0'),
    costSell: new UntypedFormControl('0.0'),
    email: new UntypedFormControl('', [Validators.email]),
    regionalGeolocalization: new UntypedFormControl(''),
    note: new UntypedFormControl(''),
    topics: new UntypedFormControl([]),
  })
  formSubmitted: boolean = false;

  constructor(private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.topicService
      .findAll()
      .subscribe(data => {
        this.topicList = data;
        if (this.newspaperToEdit.topics) {
          let tempTopics = [] as Array<Topic>;
          this.topicList.forEach(topic => {
            if (!this.newspaperToEdit.topics?.find(topicDaModificare => topicDaModificare.id === topic.id)) {
              tempTopics.push(topic);
            }
          });
          this.topicList = tempTopics;
        }
      });
    this.saveNewspaperForm.patchValue(this.newspaperToEdit);
    this.newspaperToEdit.topics?.forEach(topic => this.selectedTopicList.push(topic));
    this.setTopicValue()
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.saveNewspaperForm.valid) {
      this.setTopicValue();
      this.formSubmit.emit(this.saveNewspaperForm.value as SaveNewspaperDto);
    }
  }

  countSelectedTopic() {
    return this.topicList.filter(leftItem => leftItem.selected).length;
  }

  countSelectedAddedTopic() {
    return this.selectedTopicList.filter(leftItem => leftItem.selected).length;
  }

  fromLeftToRight() {
    this.topicList.filter(leftItem => leftItem.selected)
      .map(leftItem => {
        return {...leftItem, selected: false}
      })
      .forEach(leftItem => this.selectedTopicList.push(leftItem));
    this.topicList = this.topicList.filter(leftItem => !leftItem.selected);
    this.setTopicValue();
  }

  fromRightToLeft() {
    this.selectedTopicList.filter(rightItem => rightItem.selected)
      .map(rightItem => {
        return {...rightItem, selected: false}
      }).forEach(rightItem => this.topicList.push(rightItem));

    this.selectedTopicList = this.selectedTopicList.filter(rightItem => !rightItem.selected);
    this.setTopicValue();
  }

  aggiungiTutti() {
    this.topicList.forEach(leftItem => this.selectedTopicList.push(leftItem));
    this.topicList = [];
    this.setTopicValue();
  }

  rimuoviTutti() {
    this.selectedTopicList.forEach(rightItem => this.topicList.push(rightItem));
    this.selectedTopicList = [];
    this.setTopicValue();
  }

  private setTopicValue(): void {
    this.saveNewspaperForm.controls.topics.setValue(this.selectedTopicList.map(value => value.id));
  }
}
