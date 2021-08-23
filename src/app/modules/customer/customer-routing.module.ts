import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerDashboardComponent} from "./views/customer-dashboard/customer-dashboard.component";
import {CustomerNewComponent} from "./views/customer-new/customer-new.component";

const routes: Routes = [{
  path: "",
  children: [
    { path: "", component: CustomerDashboardComponent, pathMatch: "full"},
    { path: "new", component: CustomerNewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
