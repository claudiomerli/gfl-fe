import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {BehaviorSubject, fromEvent} from "rxjs";
import {User} from "../../../shared/model/user";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {debounceTime} from "rxjs/operators";
import {SortEvent} from "../../../shared/directives/sortable.directive";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {


  actualPage$ = new BehaviorSubject<PageResponseDto<User>>(new PageResponseDto<User>());
  actualPageValue = 1;

  @ViewChild("globalSearchInput")
  globalSearchInput: ElementRef | undefined
  globalSearch = "";

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.onPageChange(this.actualPageValue);
  }

  ngAfterViewInit(): void {
    if (this.globalSearchInput) {
      fromEvent(this.globalSearchInput.nativeElement, 'keyup')
        .pipe(debounceTime(200))
        .subscribe((res) => {
          this.globalSearch = (res as any).target.value
          this.onPageChange(1);
        })
    }
  }

  onPageChange(pageNumber: number, sortBy?: string, sortDirection?: string) {
    this.actualPageValue = pageNumber;
    this.userService
      .find(this.globalSearch, new PaginationDto(this.actualPageValue - 1, undefined ,sortDirection, sortBy ))
      .subscribe(res => {
        this.actualPage$.next(res);
      })
  }

  onDelete(id: number | undefined) {
    if (id) {
      this.userService
        .delete(id)
        .subscribe(() => {
          this.onPageChange(1);
        })
    }
  }

  onSort($event: SortEvent) {
    this.onPageChange(this.actualPageValue, $event.column, $event.direction);
  }
}
