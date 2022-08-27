import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsListComponent} from "./views/news-list/news-list.component";
import {CreateNewsComponent} from "./views/create-news/create-news.component";
import {NewsDetailComponent} from "./views/news-detail/news-detail.component";
import {EditNewsComponent} from "./views/edit-news/edit-news.component";
import {AuthGuard} from "../shared/guards/auth.guard";

const routes: Routes = [{
  path: "", component: NewsListComponent
}, {
  path: "create", component: CreateNewsComponent,
  canActivate: [AuthGuard],
  data: {availableRoles: ['ADMIN']}
}, {
  path: ":id", component: NewsDetailComponent
}, {
  path: ":id/edit", component: EditNewsComponent,
  canActivate: [AuthGuard],
  data: {availableRoles: ['ADMIN']}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {
}
