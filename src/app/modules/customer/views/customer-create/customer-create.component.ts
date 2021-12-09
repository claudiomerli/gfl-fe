import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CustomerService} from "../../../shared/services/customer.service";

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

  onSubmit($event: any) {
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
