import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatisticsDashboardComponent} from "./views/statistics-dashboard/statistics-dashboard.component";

const routes: Routes = [{
  path: '',
  component: StatisticsDashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
