import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectDashboardComponent} from "./views/project-dashboard/project-dashboard.component";
import {ProjectNewComponent} from "./views/project-new/project-new.component";
import {ProjectEditComponent} from "./views/project-edit/project-edit.component";
import {ProjectInvoicingComponent} from "./views/project-invoicing/project-invoicing.component";

const routes: Routes = [{
  path: "",
  children: [
    { path: "home", component: ProjectDashboardComponent, pathMatch: "full"},
    { path: "create", component: ProjectNewComponent },
    { path: "invoicing", component: ProjectInvoicingComponent },
    { path: ":id", component: ProjectEditComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
