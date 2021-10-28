import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceQuotationComponent } from './views/price-quotation/price-quotation.component';
import {PriceQuotationRoutingModule} from "./price-quotation-routing.module";



@NgModule({
  declarations: [
    PriceQuotationComponent
  ],
  imports: [
    CommonModule,
    PriceQuotationRoutingModule
  ]
})
export class PriceQuotationModule { }
