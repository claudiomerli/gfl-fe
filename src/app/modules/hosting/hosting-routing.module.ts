import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HostingDashboardComponent} from "./views/hosting-dashboard/hosting-dashboard.component";
import {HostingCreateComponent} from "./views/hosting-create/hosting-create.component";
import {HostingEditComponent} from "./views/hosting-edit/hosting-edit.component";

const routes: Routes = [
  {path: '', component: HostingDashboardComponent},
  {path: 'new', component: HostingCreateComponent},
  {path: ':id', component: HostingEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostingRoutingModule {
}
