import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceQuotationComponent } from './views/price-quotation/price-quotation.component';
import {PriceQuotationRoutingModule} from "./price-quotation-routing.module";
import {NgxAutocompleteModule} from "ngx-angular-autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    PriceQuotationComponent
  ],
    imports: [
        CommonModule,
        PriceQuotationRoutingModule,
        NgxAutocompleteModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class PriceQuotationModule { }
