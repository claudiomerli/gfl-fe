import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PriceQuotationComponent} from "./views/price-quotation/price-quotation.component";

const routes: Routes = [
  {path: '', component: PriceQuotationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceQuotationRoutingModule {
}
