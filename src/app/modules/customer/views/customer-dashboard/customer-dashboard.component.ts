import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from "../../../shared/services/customer.service";
import {Observable, Subscription} from "rxjs";
import {Customer} from "../../../shared/model/customer";
import {timeout} from "rxjs/operators";

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit, OnDestroy {

  customerList = [] as Array<Customer>;
  customerListSubscription: Subscription | undefined;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerListSubscription =  this.customerService.get().subscribe(data => this.customerList = data);
  }

  ngOnDestroy() {
    if(this.customerListSubscription) {
      this.customerListSubscription.unsubscribe();
    }
  }

}
