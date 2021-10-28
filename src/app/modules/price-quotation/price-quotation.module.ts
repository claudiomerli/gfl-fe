import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceQuotationComponent } from './views/price-quotation/price-quotation.component';
import {PriceQuotationRoutingModule} from "./price-quotation-routing.module";
import {NgxAutocompleteModule} from "ngx-angular-autocomplete";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PriceQuotationComponent
  ],
  imports: [
    CommonModule,
    PriceQuotationRoutingModule,
    NgxAutocompleteModule,
    ReactiveFormsModule
  ]
})
export class PriceQuotationModule { }
