import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DomainDashboardComponent} from "./views/domain-dashboard/domain-dashboard.component";
import {DomainCreateComponent} from "./views/domain-create/domain-create.component";
import {DomainEditComponent} from "./views/domain-edit/domain-edit.component";

const routes: Routes = [
  {path: '', component: DomainDashboardComponent},
  {path: 'new', component: DomainCreateComponent},
  {path: ':id', component: DomainEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainRoutingModule {
}
