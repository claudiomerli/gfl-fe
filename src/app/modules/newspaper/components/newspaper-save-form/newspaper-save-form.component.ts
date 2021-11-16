import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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

  @Input()  onSaving = false;

  @Input() newspaperToEdit: Newspaper = new Newspaper()
  @Output() formSubmit = new EventEmitter<SaveNewspaperDto>();

  topicList = [] as Array<Topic>;
  selectedTopicList = [] as Array<Topic>;

  constructor(private topicService: TopicService) {
  }

  ngOnInit(): void {
    this.topicService.findAll().subscribe(data => {
      this.topicList = data;
      if(this.newspaperToEdit.topics) {
        let tempTopics = [] as Array<Topic>;
        this.topicList.forEach(topic => {
          if(!this.newspaperToEdit.topics?.find(topicDaModificare => topicDaModificare.id === topic.id)) {
            tempTopics.push(topic);
          }
        });
        this.topicList = tempTopics;
      }
    });
    this.saveNewspaperForm.patchValue(this.newspaperToEdit);
    this.newspaperToEdit.topics?.forEach(topic => this.selectedTopicList.push(topic));

  }

  saveNewspaperForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    purchasedContent: new FormControl('0.0'),
    costEach: new FormControl('0.0'),
    costSell: new FormControl('0.0'),
    email: new FormControl(''),
    regionalGeolocalization: new FormControl(''),
    note: new FormControl(''),
    topics: new FormControl([]),
  })

  onSubmit() {
    this.formSubmit.emit(this.saveNewspaperForm.value as SaveNewspaperDto)
  }

  countSelectedTopic() {
    return this.topicList.filter(leftItem => leftItem.selected).length;
  }

  countSelectedAddedTopic() {
    return this.selectedTopicList.filter(leftItem => leftItem.selected).length;
  }

  fromLeftToRight() {
    this.topicList.filter(leftItem => leftItem.selected)
      .map(leftItem => {return {...leftItem, selected: false}})
      .forEach(leftItem => this.selectedTopicList.push(leftItem));
    this.topicList = this.topicList.filter(leftItem => !leftItem.selected);
    this.setTopicValue();
  }
  fromRightToLeft() {
    this.selectedTopicList.filter(rightItem => rightItem.selected)
      .map(rightItem => {return {...rightItem, selected: false}})
      .forEach(rightItem => this.topicList.push(rightItem));
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
  }

  private setTopicValue(): void {
    let values = new Array<number>();
    this.selectedTopicList.forEach(topic => values.push(topic.id));
    this.saveNewspaperForm.controls.topics.setValue(values);
    console.log(this.saveNewspaperForm.value);
  }
}
