import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {Suggest} from "../../../shared/model/suggest";
import {SuggestService} from "../../../shared/services/suggest.service";

@Component({
  selector: 'app-suggets-list',
  templateUrl: './suggets-list.component.html',
  styleUrls: ['./suggets-list.component.scss']
})
export class SuggetsListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("globalSearchInput")
  globalSearchInput: ElementRef | undefined
  globalSearch = "";

  suggests$: BehaviorSubject<Suggest[]> = new BehaviorSubject<Suggest[]>([]);
  suggestsStore: Suggest[] = [];

  newKeyword: string = "";

  interval: any;

  constructor(private suggestService: SuggestService) {
  }

  ngOnInit(): void {
    this.fetch()
    this.interval = setInterval(() => this.fetch(), 10000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngAfterViewInit(): void {
    if (this.globalSearchInput) {
      fromEvent(this.globalSearchInput.nativeElement, 'keyup')
        .pipe(debounceTime(200))
        .subscribe((res) => {
          this.globalSearch = (res as any).target.value
          this.applyFilter();
        })
    }
  }

  onDelete(id: number) {
    this.suggestService
      .delete(id)
      .subscribe(() => {
        this.fetch();
      })
  }

  onAdd() {
    this.suggestService.save(this.newKeyword)
      .subscribe(() => {
        this.newKeyword = "";
        this.globalSearch = "";
        this.fetch();
      })
  }

  private fetch() {
    this.suggestService
      .find()
      .subscribe(res => {
        this.suggestsStore = res;
        this.applyFilter();
      })
  }

  private applyFilter() {
    this.suggests$.next(
      this.suggestsStore
        .filter(({keyword}) => keyword.toLowerCase()?.includes(this.globalSearch.toLowerCase()))
    )
  }

}
