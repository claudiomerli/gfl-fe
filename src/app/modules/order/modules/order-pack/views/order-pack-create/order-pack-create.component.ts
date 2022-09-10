import { Component, OnInit } from '@angular/core';
import {SaveOrderPackDto} from "../../../../../shared/messages/order/save-order-pack.dto";
import {OrderPackService} from "../../../../../shared/services/order-pack.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-pack-create',
  templateUrl: './order-pack-create.component.html',
  styleUrls: ['./order-pack-create.component.scss']
})
export class OrderPackCreateComponent implements OnInit {

  constructor(private orderPackService : OrderPackService, private router : Router) { }

  ngOnInit(): void {
  }

  onSave($event: SaveOrderPackDto) {
    this.orderPackService
      .save($event)
      .subscribe(() =>{
        this.router.navigate(['/orders/pack'])
      })
  }
}
