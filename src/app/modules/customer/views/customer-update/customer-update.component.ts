import {Component, OnInit} from '@angular/core';
import {Customer} from "../../../shared/model/customer";
import {ActivatedRoute, Router} from "@angular/router";
import {SaveCustomerDto} from "../../../shared/messages/customer/save-customer.dto";
import {CustomerService} from "../../../shared/services/customer.service";

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.scss']
})
export class CustomerUpdateComponent implements OnInit {

  onSaving = false;
  customerToUpdate: Customer | undefined;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute
      .paramMap
      .subscribe(params => {
        let id = params.get("id");
        if (id) {
          this.customerService.findById(+id)
            .subscribe(customer => {
              this.customerToUpdate = customer
            })
        }
      })
  }

  onSubmit($event: SaveCustomerDto) {
    this.onSaving = true
    if (this.customerToUpdate?.id) {
      this.customerService
        .update(this.customerToUpdate?.id, $event)
        .subscribe(() => {
          this.onSaving = false
          this.router.navigate(["/customers"])
        }, error => {
          this.onSaving = false
          console.error(error)
        });
    }
  }
}
