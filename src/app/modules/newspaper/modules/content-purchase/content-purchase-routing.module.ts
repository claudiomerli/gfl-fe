import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentPurchaseListComponent} from "./views/content-purchase-list/content-purchase-list.component";
import {ContentPurchaseCreateComponent} from "./views/content-purchase-create/content-purchase-create.component";
import {ContentPurchaseDetailsComponent} from "./views/content-purchase-details/content-purchase-details.component";

const routes: Routes = [{
  path: '',
  component: ContentPurchaseListComponent
}, {
  path: 'create',
  component: ContentPurchaseCreateComponent
}, {
  path: ':id',
  component: ContentPurchaseDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentPurchaseRoutingModule {
}
