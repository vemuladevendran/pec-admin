import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentService } from 'src/app/services/student/student.service';
import { TimeTableService } from 'src/app/services/time-table/time-table.service';

@Component({
  selector: 'app-take-attendance',
  templateUrl: './take-attendance.component.html',
  styleUrls: ['./take-attendance.component.scss']
})
export class TakeAttendanceComponent implements OnInit {

  attendanceForm: FormGroup;
  sectionList: any[] = [];
  departmentList: any[] = [];
  studentsList: any[] = [];
  daysInWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  weekTimeTable: any;
  currentPeriod = '';
  constructor(
    private studentServe: StudentService,
    private departmentServe: DepartmentService,
    private titmetableServe: TimeTableService,
    private attendanceServe: AttendanceService,
    private router: Router,
    private fb: FormBuilder,
    private loaderServe: LoaderService,
    private toast: ToastrService,
  ) {
    this.attendanceForm = this.fb.group({
      date: [new Date()],
      departmentName: ['', Validators.required],
      year: ['', Validators.required],
      section: ['', Validators.required],
      periodNumber: ['', Validators.required],
      subject: ['', Validators.required],
      students: this.fb.array([]),
    });
  }


  // get department list
  async getDepartments(): Promise<void> {
    try {
      this.departmentList = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);
    }
  }
  // onyear change get the sections

  async getSections(): Promise<void> {
    try {
      this.sectionList = await this.departmentServe.getSections(this.attendanceForm.value.departmentName, this.attendanceForm.value.year);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message)
    }
  }

  // get students
  async getStudents(): Promise<void> {
    try {
      this.loaderServe.show();
      this.studentsList = await this.studentServe.getStudents({
        departmentName: this.attendanceForm.value.departmentName,
        year: this.attendanceForm.value.year,
        section: this.attendanceForm.value.section,
      });
      this.getPeriods();
      this.createAttendanceList();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    } finally {
      this.loaderServe.hide();
    }
  }

  // mark attendance
  createAttendanceList(): void {
    const att = this.attendanceForm.get('students') as FormArray;
    this.studentsList.map((x) => {
      att.push(this.fb.group({
        examNumber: [x.examNumber, Validators.required],
        attendance: [true, Validators.required],
      }))
    });
  }

  // get periods
  async getPeriods(): Promise<void> {
    try {
      const day = new Date().getDay();
      const filters = {
        departmentName: this.attendanceForm.value.departmentName,
        year: this.attendanceForm.value.year,
        section: this.attendanceForm.value.section,
        day: this.daysInWeek[day]
      }
      const data = await this.titmetableServe.getTimeTable(filters);
      this.weekTimeTable = data.data
    } catch (error) {
      console.log(error);
    }
  }

  // setcurrent subject
  setCurrentPeriodSubject(): void {
    this.currentPeriod = this.weekTimeTable[this.attendanceForm.value.periodNumber];
    this.attendanceForm.controls['subject'].setValue(this.currentPeriod);
  }

  // save attendance
  async handleSubmit(): Promise<void> {
    try {
      this.loaderServe.show();
      const data = this.attendanceForm.value;
      const result = await this.attendanceServe.markAttendance(data)
      this.toast.success(result.message);
      this.router.navigate(['/attendance-report']);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message)
    } finally {
      this.loaderServe.hide();
    }
  }


  // 
  ngOnInit(): void {
    this.getDepartments();
  }

}
