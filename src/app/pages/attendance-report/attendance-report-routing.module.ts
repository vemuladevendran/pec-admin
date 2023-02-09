import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceReportComponent } from './attendance-report.component';
import { GetReportsComponent } from './get-reports/get-reports.component';
import { TakeAttendanceComponent } from './take-attendance/take-attendance.component';

const routes: Routes = [
  { path: '', component: AttendanceReportComponent },
  { path: 'take-attendance', component: TakeAttendanceComponent },
  { path: 'reports', component: GetReportsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceReportRoutingModule { }
