import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SuggestRoutingModule} from './suggest-routing.module';
import {SuggetsListComponent} from './views/suggets-list/suggets-list.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    SuggetsListComponent,
  ],
  imports: [
    CommonModule,
    SuggestRoutingModule,
    FormsModule
  ]
})
export class SuggestModule {
}
