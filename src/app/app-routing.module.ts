import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./modules/shared/guards/auth.guard";

const routes: Routes = [
  {path: "", redirectTo: "/contents", pathMatch: "full"},
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "projects",
    loadChildren: () => import("./modules/project/project.module").then(m => m.ProjectModule),
    canActivate: [AuthGuard]
  },
  {
    path: "users",
    loadChildren: () => import("./modules/user/user.module").then(m => m.UserModule),
    canActivate: [AuthGuard],
    data: {availableRoles: ['ADMIN']}
  },
  {
    path: "newspapers",
    loadChildren: () => import("./modules/newspaper/newspaper.module").then(m => m.NewspaperModule),
    canActivate: [AuthGuard],
    data: {availableRoles: ['ADMIN', 'CUSTOMER']}
  },
  {
    path: 'customers',
    loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule),
    canActivate: [AuthGuard],
    data: {availableRoles: ['ADMIN']}
  },
  {
    path: 'contents',
    loadChildren: () => import('./modules/content/content.module').then(m => m.ContentModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'suggests',
    loadChildren: () => import('./modules/suggest/suggest.module').then(m => m.SuggestModule),
    canActivate: [AuthGuard],
    data: {availableRoles: ['ADMIN']}
  },
  {
    path: 'reserved',
    loadChildren: () => import('./modules/reserved/reserved.module').then(m => m.ReservedModule)
  },
  {
    path: "customer",
    loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule),
    canActivate: [AuthGuard]
  },
  {
    path: "price-quotation",
    loadChildren: () => import("./modules/price-quotation/price-quotation.module").then(m => m.PriceQuotationModule),
    canActivate: [AuthGuard],
    data: {availableRoles: ['ADMIN']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
