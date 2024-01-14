import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  NewspaperDiscountDashboardComponent
} from "./views/newspaper-discount-dashboard/newspaper-discount-dashboard.component";

const routes: Routes = [
  {path: '', component: NewspaperDiscountDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewspaperDiscountRoutingModule {
}
