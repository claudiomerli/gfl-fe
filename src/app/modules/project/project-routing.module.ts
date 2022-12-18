import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectDashboardComponent} from "./views/project-dashboard/project-dashboard.component";
import {ProjectDetailsComponent} from "./views/project-details/project-details.component";
import {ProjectStatisticsComponent} from "./views/project-statistics/project-statistics.component";

const routes: Routes = [{
  path: "",
  component: ProjectDashboardComponent
},
  {
    path: ":id",
    component: ProjectDetailsComponent
  },
  {
    path: ":id/statistics",
    component: ProjectStatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {
}
