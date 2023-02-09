import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { StudentService } from 'src/app/services/student/student.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-get-reports',
  templateUrl: './get-reports.component.html',
  styleUrls: ['./get-reports.component.scss']
})
export class GetReportsComponent implements OnInit {

  filtersForm: FormGroup;
  maxDate = new Date();
  userDetails: any;
  studentsDetails: any[] = [];
  studentsName: any[] = [];
  constructor(
    private fb: FormBuilder,
    private attendanceServe: AttendanceService,
    private studentServe: StudentService,
    private toast: ToastrService,
    private tokenServe: TokenService,
  ) {
    this.filtersForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      year: ['', Validators.required],
      count: ['', Validators.required],
    })
  }


  // get report
  async getReportDetails(): Promise<void> {
    try {
      this.studentsDetails = await this.attendanceServe.getReports(this.filtersForm.value);
      if (this.studentsDetails.length > 0) {
        this.studentsNameDetails();
      }
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    }
  }

  // get student details
  async studentsNameDetails(): Promise<void> {
    try {
      let filters: any = [];
      this.studentsDetails.forEach((x) => {
        filters.push(x.examNumber);
      })
      console.log(this.studentsDetails);
      console.log(filters);

      this.studentsName = await this.studentServe.getStudentsByExamNumbers({ examNumber: filters });
    } catch (error) {
      console.log(error);
      this.toast.error('fail to get students name');
    }
  }

  // get user details
  async getUserDetails(): Promise<void> {
    try {
      this.userDetails = await this.tokenServe.getTokenData();
    } catch (error) {
      this.toast.error('fail to get user details')
    }
  }

  // print pdf
  print() {
    window.print();
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

}
