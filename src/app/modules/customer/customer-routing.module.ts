import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerListComponent} from "./views/customer-list/customer-list.component";
import {CustomerCreateComponent} from "./views/customer-create/customer-create.component";
import {CustomerUpdateComponent} from "./views/customer-update/customer-update.component";

const routes: Routes = [
  {path: '', component: CustomerListComponent},
  {path: "create", component: CustomerCreateComponent},
  {path: ":id", component: CustomerUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
