import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent} from "rxjs";
import {Newspaper} from "../../../shared/model/newspaper";
import {debounceTime} from "rxjs/operators";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {NewspaperService} from "../../../shared/services/newspaper.service";

@Component({
  selector: 'app-newspaper-list',
  templateUrl: './newspaper-list.component.html',
  styleUrls: ['./newspaper-list.component.scss']
})
export class NewspaperListComponent implements OnInit, AfterViewInit {

  @ViewChild("globalSearchInput")
  globalSearchInput: ElementRef | undefined
  globalSearch = "";

  newspaperList = new BehaviorSubject<Newspaper[]>([]);

  constructor(private newspaperService: NewspaperService) {
  }

  ngOnInit(): void {
    this.fetch()
  }

  ngAfterViewInit(): void {
    if (this.globalSearchInput) {
      fromEvent(this.globalSearchInput.nativeElement, 'keyup')
        .pipe(debounceTime(200))
        .subscribe((res) => {
          this.globalSearch = (res as any).target.value
          this.fetch();
        })
    }
  }

  fetch() {
    this.newspaperService
      .findAll(this.globalSearch)
      .subscribe(res => {
        this.newspaperList.next(res);
      })
  }

  onDelete(id: number | undefined) {
    if (id) {
      this.newspaperService
        .delete(id)
        .subscribe(() => {
          this.fetch();
        })
    }
  }
}
