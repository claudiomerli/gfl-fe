import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderListComponent} from "./views/order-list/order-list.component";
import {OrderUpdateComponent} from "./views/order-update/order-update.component";

const routes: Routes = [
  {path: "", component: OrderListComponent},
  {path: "pack", loadChildren: () => import('./modules/order-pack/order-pack.module').then(m => m.OrderPackModule)},
  {path: ":id", component: OrderUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
