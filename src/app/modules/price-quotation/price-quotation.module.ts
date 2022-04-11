import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {PriceQuotationComponent} from "./views/price-quotation/price-quotation.component";
import {CommonModule} from "@angular/common";
import {PriceQuotationRoutingModule} from "./price-quotation-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxAutocompleteModule} from "ngx-angular-autocomplete";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import {NewspaperModule} from "../newspaper/newspaper.module";


@NgModule({
  declarations: [
    PriceQuotationComponent
  ],
    imports: [
        CommonModule,
        PriceQuotationRoutingModule,
        NgxAutocompleteModule,
        ReactiveFormsModule,
        SharedModule,
        NgbTypeaheadModule,
        FormsModule,
        NewspaperModule
    ]
})
export class PriceQuotationModule { }
