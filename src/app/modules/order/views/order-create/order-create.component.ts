import {Component, OnInit} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {OrderService} from "../../../shared/services/order.service";
import {SaveOrderDto} from "../../../shared/messages/order/save-order.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {

  constructor(private orderService: OrderService, private router: Router) {
  }

  ngOnInit(): void {
  }

  saveOrder(saveOrderDto: SaveOrderDto) {
    this.orderService.save(saveOrderDto).subscribe(saved => {
      this.router.navigate(['/orders'])
    })
  }
}
