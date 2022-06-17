import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, Validators} from "@angular/forms";
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
    name: new UntypedFormControl(''),
    zaFrom: new UntypedFormControl(''),
    zaTo: new UntypedFormControl(''),
    purchasedContentFrom: new UntypedFormControl(''),
    purchasedContentTo: new UntypedFormControl(''),
    costEachFrom: new UntypedFormControl(''),
    costEachTo: new UntypedFormControl(''),
    costSellFrom: new UntypedFormControl(''),
    costSellTo: new UntypedFormControl(''),
    regionalGeolocalization: new UntypedFormControl(''),
    topics: new UntypedFormControl([]),
  })

  constructor(private formBuilder: UntypedFormBuilder,
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
