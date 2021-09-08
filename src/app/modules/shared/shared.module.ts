import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './views/header/header.component';
import {RouterModule} from "@angular/router";
import {StatusLabelPipe} from './pipes/status-label.pipe';
import {RuleSatisfationIndicatorColorPipe} from './pipes/rule-satisfation-indicator-color.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    StatusLabelPipe,
    RuleSatisfationIndicatorColorPipe
  ],
  exports: [
    HeaderComponent,
    StatusLabelPipe,
    RuleSatisfationIndicatorColorPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
