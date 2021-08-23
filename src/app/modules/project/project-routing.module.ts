import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectDashboardComponent} from "./views/project-dashboard/project-dashboard.component";
import {ProjectNewComponent} from "./views/project-new/project-new.component";
import {ProjectEditComponent} from "./views/project-edit/project-edit.component";

const routes: Routes = [{
  path: "",
  children: [
    { path: "", component: ProjectDashboardComponent, pathMatch: "full"},
    { path: "new", component: ProjectNewComponent },
    { path: "{id}/modifica", component: ProjectEditComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
