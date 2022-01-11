import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceReportRoutingModule } from './attendance-report-routing.module';
import { AttendanceReportComponent } from './attendance-report.component';


@NgModule({
  declarations: [
    AttendanceReportComponent
  ],
  imports: [
    CommonModule,
    AttendanceReportRoutingModule
  ]
})
export class AttendanceReportModule { }
