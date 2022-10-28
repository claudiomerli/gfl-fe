import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectDashboardComponent} from "./views/project-dashboard/project-dashboard.component";
import {ProjectDetailsComponent} from "./views/project-details/project-details.component";

const routes: Routes = [{
  path: "",
  component: ProjectDashboardComponent
},
  {
    path: ":id",
    component: ProjectDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
