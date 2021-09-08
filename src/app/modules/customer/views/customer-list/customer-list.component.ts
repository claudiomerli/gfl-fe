import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent} from "rxjs";
import {CustomerService} from "../../../shared/services/customer.service";
import {debounceTime} from "rxjs/operators";
import {Customer} from "../../../shared/model/customer";
import {PageResponseDto} from "../../../shared/messages/page-response.dto";
import {PaginationDto} from "../../../shared/messages/pagination.dto";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, AfterViewInit {

  @ViewChild("globalSearchInput")
  globalSearchInput: ElementRef | undefined
  globalSearch = "";

  actualPage$ = new BehaviorSubject<PageResponseDto<Customer>>(new PageResponseDto<Customer>());
  actualPageValue = 1;

  constructor(private customerService: CustomerService) {
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

  onDelete(id: number | undefined) {
    if (id) {
      this.customerService
        .delete(id)
        .subscribe(() => {
          this.onPageChange(1);
        })
    }
  }

  onPageChange(pageNumber: number) {
    this.actualPageValue = pageNumber;
    this.customerService
      .find(this.globalSearch, {...new PaginationDto(), page: this.actualPageValue - 1})
      .subscribe(res => {
        this.actualPage$.next(res);
      })
  }
}
