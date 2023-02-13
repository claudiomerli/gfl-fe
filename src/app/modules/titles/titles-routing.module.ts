import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TitlesDashboardComponent} from "./views/titles-dashboard/titles-dashboard.component";

const routes: Routes = [
  {path: '', component: TitlesDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TitlesRoutingModule {
}
