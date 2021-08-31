import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerService} from "../../../shared/services/customer.service";
import {SaveCustomerDto} from "../../../shared/messages/customer/save-customer.dto";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent {
  onSaving = false;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {
  }

  onSubmit($event: SaveCustomerDto) {
    this.onSaving = true
    this.customerService.save($event).subscribe(
      () => {
        this.onSaving = false
        this.router.navigate(["/customers"])
      },
      error => {
        this.onSaving = false
        console.error(error)
      });
  }
}
