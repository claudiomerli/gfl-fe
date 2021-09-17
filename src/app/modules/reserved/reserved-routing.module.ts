import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerContentComponent} from "./views/customer-content/customer-content.component";

const routes: Routes = [
  {path : "content/:id",component : CustomerContentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservedRoutingModule { }
