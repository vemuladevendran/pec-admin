import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {

  attendanceReports: any[] = [];
  filtersForm: FormGroup;
  maxDate = new Date();
  filters = {};
  departments: any[] = [];
  constructor(
    private attendanceServe: AttendanceService,
    private departmentServe: DepartmentService,
    private loader: LoaderService,
    private toast: ToastrService,
    private fb: FormBuilder,
  ) {
    this.filtersForm = this.fb.group({
      date: [new Date()],
      departmentName: [''],
      year: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getAttendanceReport(this.filters);
      });
  }


  // get attendance report
  async getAttendanceReport(filters: any): Promise<void> {
    try {
      this.loader.show();
      const data = await this.attendanceServe.getAttendanceDetails(filters);
      this.attendanceReports = data.data;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    } finally {
      this.loader.hide();
    }
  }

  // get department
  async getDepartments(): Promise<void> {
    try {
      this.departments = await this.departmentServe.getDepartmentDetails();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    }
  }


  ngOnInit(): void {
    this.getAttendanceReport(this.filters);
    this.getDepartments();
  }

}
