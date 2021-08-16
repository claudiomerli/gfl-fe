import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectDashboardComponent} from "./views/project-dashboard/project-dashboard.component";

const routes: Routes = [{
  path: "", component: ProjectDashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
