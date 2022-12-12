import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import {StatisticsDashboardComponent} from "./views/statistics-dashboard/statistics-dashboard.component";
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  declarations: [
    StatisticsDashboardComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    MatToolbarModule
  ]
})
export class StatisticsModule { }
