import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GenericOrderListComponent} from "./views/generic-order-list/generic-order-list.component";
import {GenericOrderDetailComponent} from "./views/generic-order-detail/generic-order-detail.component";

const routes: Routes = [
  {
    path: '',
    component: GenericOrderListComponent
  },
  {
    path: ':id',
    component: GenericOrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenericOrderRoutingModule {
}
