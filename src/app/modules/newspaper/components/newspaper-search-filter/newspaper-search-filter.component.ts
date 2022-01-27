import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {SearchNewspaperDto} from "../../../shared/messages/newspaper/search-newspaper.dto";
import {TopicService} from "../../../shared/services/topic.service";
import {Topic} from "../../../shared/model/topic";

@Component({
  selector: 'app-newspaper-search-filter',
  templateUrl: './newspaper-search-filter.component.html',
  styleUrls: ['./newspaper-search-filter.component.scss']
})
export class NewspaperSearchFilterComponent implements OnInit {

  @Output()
  submitSearchForm = new EventEmitter<SearchNewspaperDto>();
  topicList = new Array<Topic>();
  formSubmitted: boolean = false;

  searchForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    zaFrom: new FormControl(''),
    zaTo: new FormControl(''),
    purchasedContentFrom: new FormControl(''),
    purchasedContentTo: new FormControl(''),
    costEachFrom: new FormControl(''),
    costEachTo: new FormControl(''),
    costSellFrom: new FormControl(''),
    costSellTo: new FormControl(''),
    regionalGeolocalization: new FormControl(''),
    topics: new FormControl([]),
  })

  constructor(private formBuilder: FormBuilder,
              private topicService: TopicService) {
  }



  ngOnInit(): void {
    this.topicService.findAll().subscribe(data => {
      this.topicList = data;
    });
  }

  onSubmit() {
    this.submitSearchForm.emit(this.searchForm.value as SearchNewspaperDto)
  }
}
