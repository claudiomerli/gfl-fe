import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SearchNewspaperDto} from "../../../shared/messages/newspaper/search-newspaper.dto";
import {TopicService} from "../../../shared/services/topic.service";
import {Topic} from "../../../shared/messages/newspaper/topic";
import {ChangeContext, Options} from "@angular-slider/ngx-slider";
import {
  getPointerColor,
  getSelectionBarColor,
  regionalGeolocalizzation,
  translateCurrency
} from "../../../shared/utils/utils";
import {debounceTime} from "rxjs/operators";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {MaxMinRangeNewspaperAttributes} from "../../../shared/messages/newspaper/max-min-range-newspaper-attributes";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-newspaper-search-filter',
  templateUrl: './newspaper-search-filter.component.html',
  styleUrls: ['./newspaper-search-filter.component.scss']
})
export class NewspaperSearchFilterComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private topicService: TopicService, private newsPaperService: NewspaperService) {
  }

  @Output()
  submitSearchForm = new EventEmitter<SearchNewspaperDto>();

  maxMinRangeNewspaperAttributes: MaxMinRangeNewspaperAttributes | undefined;

  topicList: Topic[] = [];
  regionalGeolocalizzation = regionalGeolocalizzation
  searchForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    zaFrom: new FormControl(),
    zaTo: new FormControl(),
    leftContentFrom: new FormControl(),
    leftContentTo: new FormControl(),
    costEachFrom: new FormControl(),
    costEachTo: new FormControl(),
    costSellFrom: new FormControl(),
    costSellTo: new FormControl(),
    regionalGeolocalization: new FormControl([]),
    topics: new FormControl([]),
    hidden: new FormControl(''),
    sensitiveTopics: new FormControl('')
  })


  zaSliderOptions: Options = {
    ceil: 0,
    floor: 0,
    getSelectionBarColor: getSelectionBarColor,
    getPointerColor: getPointerColor
  }

  leftContentSliderOptions: Options = {
    ceil: 0,
    floor: 0,
    getSelectionBarColor: getSelectionBarColor,
    getPointerColor: getPointerColor
  }

  costEachSliderOptions: Options = {
    ceil: 0,
    floor: 0,
    getSelectionBarColor: getSelectionBarColor,
    getPointerColor: getPointerColor,
    translate: translateCurrency
  }

  costSellSliderOptions: Options = {
    ceil: 0,
    floor: 0,
    getSelectionBarColor: getSelectionBarColor,
    getPointerColor: getPointerColor,
    translate: translateCurrency
  }

  ngOnInit(): void {
    this.topicService.findAll().subscribe(data => {
      this.topicList = data;
    });

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.submitSearchForm.emit(this.searchForm.value as SearchNewspaperDto)
      })

    this.newsPaperService.getMaxMinRangeNewspaperAttributes().subscribe((result) => {
      this.maxMinRangeNewspaperAttributes = result
      this.searchForm.patchValue({
        id: this.activatedRoute.snapshot.queryParamMap.get("id") || '',
        zaFrom: result.minZA,
        zaTo: result.maxZA,
        leftContentFrom: result.minLeftContent,
        leftContentTo: result.maxLeftContent,
        costEachFrom: result.minCostEach,
        costEachTo: result.maxCostEach,
        costSellFrom: result.minCostSell,
        costSellTo: result.maxCostSell
      })

      this.zaSliderOptions = {
        ...this.zaSliderOptions,
        floor: result.minZA,
        ceil: result.maxZA
      }


      this.leftContentSliderOptions = {
        ...this.leftContentSliderOptions,
        floor: result.minLeftContent,
        ceil: result.maxLeftContent
      }

      this.costEachSliderOptions = {
        ...this.costEachSliderOptions,
        floor: result.minCostEach,
        ceil: result.maxCostEach
      }

      this.costSellSliderOptions = {
        ...this.costSellSliderOptions,
        floor: result.minCostSell,
        ceil: result.maxCostSell
      }
    })
  }

  onZaChange($event: ChangeContext) {
    this.searchForm.controls.zaFrom.setValue($event.value)
    this.searchForm.controls.zaTo.setValue($event.highValue)

  }

  onLeftContentChange($event: ChangeContext) {
    this.searchForm.controls.leftContentFrom.setValue($event.value)
    this.searchForm.controls.leftContentTo.setValue($event.highValue)
  }

  onCostEachChange($event: ChangeContext) {
    this.searchForm.controls.costEachFrom.setValue($event.value)
    this.searchForm.controls.costEachTo.setValue($event.highValue)
  }

  onCostSellChange($event: ChangeContext) {
    this.searchForm.controls.costSellFrom.setValue($event.value)
    this.searchForm.controls.costSellTo.setValue($event.highValue)
  }

}
