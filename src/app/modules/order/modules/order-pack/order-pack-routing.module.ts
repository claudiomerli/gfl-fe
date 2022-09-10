import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderPackListComponent} from "./views/order-pack-list/order-pack-list.component";
import {OrderPackCreateComponent} from "./views/order-pack-create/order-pack-create.component";
import {OrderPackEditComponent} from "./views/order-pack-edit/order-pack-edit.component";

const routes: Routes = [{
  path: "", component: OrderPackListComponent
}, {
  path: "create", component: OrderPackCreateComponent
},
  {
    path: ":id", component: OrderPackEditComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPackRoutingModule {
}
