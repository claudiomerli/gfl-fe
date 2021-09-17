import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuggetsListComponent} from "./views/suggets-list/suggets-list.component";

const routes: Routes = [
  {path: '', component: SuggetsListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestRoutingModule {
}
