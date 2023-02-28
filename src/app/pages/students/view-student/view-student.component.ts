import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignmentsService } from 'src/app/services/assignments/assignments.service';
import { AttendanceService } from 'src/app/services/attendance/attendance.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SemesterMarksService } from 'src/app/services/semester-exam-marks/semester-marks.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  studentId = '';
  studentData: any;
  attendanceData: any[] = [];
  assignmentDetails: any[] = [];
  marksData: any[] = [];
  semesterMarksDetails: any[] = [];

  constructor(
    private studentServe: StudentService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private toast: ToastrService,
    private attendanceServe: AttendanceService,
    private assignmentServe: AssignmentsService,
    private marksServe: SemesterMarksService,
  ) {
    this.studentId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  async getStudentData(): Promise<void> {
    try {
      this.loader.show();
      this.studentData = await this.studentServe.getStudentById(this.studentId);
      this.getAttendance();
      this.getAssignments();
      this.getInternalMarksData();
      this.getSemesterMarksData();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to Load data');
    } finally {
      this.loader.hide();
    }
  };


  // get attendance data
  async getAttendance(): Promise<void> {
    try {
      this.attendanceData = await this.attendanceServe.getAttendanceDetailsByStudent(this.studentData.examNumber);
      // this.getMarksData();
    } catch (error) {
      console.error(error);
      this.toast.error('Fail to Load Attendance Data');
    }
  };

  // assignment details
  async getAssignments(): Promise<void> {
    try {
      const data = await this.assignmentServe.getAssignments({ examNumber: this.studentData?.examNumber });
      this.assignmentDetails = data[0].subjects;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load')
    };
  };

  // internal marks data
  async getInternalMarksData(): Promise<void> {
    try {
      this.marksData = await this.marksServe.getInternalMarksByStudent(this.studentData?.examNumber);
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load marks')
    };
  }

  // semester marks
  async getSemesterMarksData(): Promise<void> {
    try {
      const data = await this.marksServe.getSemesterMarksByStudent(this.studentData?.examNumber);
      this.semesterMarksDetails = data.data;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load')
    };
  }

  ngOnInit(): void {
    this.getStudentData();
  }

}
