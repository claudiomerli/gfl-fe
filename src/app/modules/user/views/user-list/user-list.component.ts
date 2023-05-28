import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {BehaviorSubject, fromEvent} from "rxjs";
import {User} from "../../../shared/messages/auth/user";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {debounceTime} from "rxjs/operators";
import {userRoles} from "../../../shared/utils/utils";
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {


  actualPage$ = new BehaviorSubject<PageResponseDto<User>>(new PageResponseDto<User>());
  actualPagination: PaginationDto = {
    page: 0,
    pageSize: 10,
    sortBy: "id",
    sortDirection: "ASC"
  }


  @ViewChild("globalSearchInput")
  globalSearchInput: ElementRef | undefined
  globalSearch = "";
  roleSearch = "";

  displayedColumns = ['id', 'username', 'fullname', 'email', 'mobilePhone', 'role', 'actions'];

  userRoles = userRoles;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.search();
  }


  ngAfterViewInit(): void {
    if (this.globalSearchInput) {
      fromEvent(this.globalSearchInput.nativeElement, 'keyup')
        .pipe(debounceTime(200))
        .subscribe((res) => {
          this.globalSearch = (res as any).target.value
          this.actualPagination.page = 0;
          this.search();
        })
    }
  }

  search() {
    this.userService
      .find(this.globalSearch, this.roleSearch, this.actualPagination)
      .subscribe(res => {
        this.actualPage$.next(res);
      })
  }

  onDelete(id: number | undefined) {
    if (id) {
      this.userService
        .delete(id)
        .subscribe(() => {
          this.actualPagination.page = 0;
          this.search()
        })
    }
  }

  onPageChange($event: PageEvent) {
    this.actualPagination.page = $event.pageIndex;
    this.actualPagination.pageSize = $event.pageSize;
    this.search()
  }

  onSortChange($event: Sort) {
    this.actualPagination.page = 0
    this.actualPagination.sortBy = $event.active
    this.actualPagination.sortDirection = $event.direction.toUpperCase()
    this.search()
  }


  changeRoleSearch($event: MatSelectChange) {
    this.roleSearch = $event.value
    this.actualPagination.page = 0
    this.search()
  }

  cancelSearch() {
    this.globalSearch = ''
    this.globalSearchInput!.nativeElement.value = ''
    this.actualPagination.page = 0;
    this.search();
  }
}
