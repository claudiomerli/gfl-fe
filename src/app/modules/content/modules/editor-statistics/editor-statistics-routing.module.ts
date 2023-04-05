import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  EditorStatisticsDashboardComponent
} from "./views/editor-statistics-dashboard/editor-statistics-dashboard.component";

const routes: Routes = [{
  path: '', component: EditorStatisticsDashboardComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorStatisticsRoutingModule {
}
