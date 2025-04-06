import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerMonitorComponent} from "./views/customer-monitor/customer-monitor.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerMonitorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerMonitorRoutingModule {
}
