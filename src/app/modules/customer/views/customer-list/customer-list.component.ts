import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent} from "rxjs";
import {CustomerService} from "../../../shared/services/customer.service";
import {debounceTime} from "rxjs/operators";
import {Customer} from "../../../shared/model/customer";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  @ViewChild("globalSearchInput")
  globalSearchInput: ElementRef | undefined
  globalSearch = "";

  customerList = new BehaviorSubject<Customer[]>([]);

  constructor(private customerService: CustomerService) {
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
    this.customerService
      .findAll(this.globalSearch)
      .subscribe(res => {
        this.customerList.next(res);
      })
  }

  onDelete(id: number | undefined) {
    if (id) {
      this.customerService
        .delete(id)
        .subscribe(() => {
          this.fetch();
        })
    }
  }
}
