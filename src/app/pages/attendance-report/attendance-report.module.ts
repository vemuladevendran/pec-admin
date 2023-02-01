import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceReportRoutingModule } from './attendance-report-routing.module';
import { AttendanceReportComponent } from './attendance-report.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const materialModules = [
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
]

@NgModule({
  declarations: [
    AttendanceReportComponent,
    TakeAttendanceComponent
  ],
  imports: [
    CommonModule,
    AttendanceReportRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class AttendanceReportModule { }
