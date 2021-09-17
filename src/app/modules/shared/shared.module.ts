import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './views/header/header.component';
import {RouterModule} from "@angular/router";
import {StatusLabelPipe} from './pipes/status-label.pipe';
import {RuleSatisfationIndicatorColorPipe} from './pipes/rule-satisfation-indicator-color.pipe';
import { IsAuthenticatedDirective } from './directives/is-authenticated.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    StatusLabelPipe,
    RuleSatisfationIndicatorColorPipe,
    IsAuthenticatedDirective
  ],
  exports: [
    HeaderComponent,
    StatusLabelPipe,
    RuleSatisfationIndicatorColorPipe,
    IsAuthenticatedDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
