import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspaperRoutingModule } from './newspaper-routing.module';
import { NewspaperSaveFormComponent } from './newspaper-save-form/newspaper-save-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NewspaperListComponent } from './views/newspaper-list/newspaper-list.component';
import { NewspaperCreateComponent } from './views/newspaper-create/newspaper-create.component';
import { NewspaperUpdateComponent } from './views/newspaper-update/newspaper-update.component';


@NgModule({
  declarations: [
    NewspaperSaveFormComponent,
    NewspaperListComponent,
    NewspaperCreateComponent,
    NewspaperUpdateComponent
  ],
  imports: [
    CommonModule,
    NewspaperRoutingModule,
    ReactiveFormsModule
  ]
})
export class NewspaperModule { }
