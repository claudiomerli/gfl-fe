import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewspaperListComponent} from "./views/newspaper-list/newspaper-list.component";
import {NewspaperCreateComponent} from "./views/newspaper-create/newspaper-create.component";
import {NewspaperUpdateComponent} from "./views/newspaper-update/newspaper-update.component";

const routes: Routes = [
  {path: "", component: NewspaperListComponent},
  {path: "create", component: NewspaperCreateComponent},
  {path: ":id", component: NewspaperUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewspaperRoutingModule {
}
