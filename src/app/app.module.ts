import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./modules/shared/shared.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SecurityInterceptor} from "./modules/shared/interceptors/security.interceptor";
import {NgxPaginationModule} from "ngx-pagination";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgxsModule, Store} from "@ngxs/store";
import {ApplicationState} from "./modules/store/state/application-state";
import {environment} from "../environments/environment";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AuthenticationState, LoadInitialAuthentication} from "./modules/store/state/authentication-state";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {NgxSpinnerModule} from "ngx-spinner";
import {TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgxsModule.forRoot([ApplicationState, AuthenticationState], {
      developmentMode: !environment.production
    }),
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store) => {
        return () => store.dispatch(new LoadInitialAuthentication())
      },
      deps: [Store],
      multi: true
    },
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill', floatLabel: 'auto'}},
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
