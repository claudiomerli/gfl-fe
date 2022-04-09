import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceQuotationComponent } from './views/price-quotation/price-quotation.component';
import {PriceQuotationRoutingModule} from "./price-quotation-routing.module";
import {NgxAutocompleteModule} from "ngx-angular-autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    PriceQuotationComponent
  ],
    imports: [
        CommonModule,
        PriceQuotationRoutingModule,
        NgxAutocompleteModule,
        ReactiveFormsModule,
        NgbTypeaheadModule,
        FormsModule
    ]
})
export class PriceQuotationModule { }
