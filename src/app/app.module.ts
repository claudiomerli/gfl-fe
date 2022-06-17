import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./modules/shared/shared.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SecurityInterceptor} from "./modules/shared/interceptors/security.interceptor";
import {NgxPaginationModule} from "ngx-pagination";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastComponent} from "./modules/toast/toast.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : SecurityInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
