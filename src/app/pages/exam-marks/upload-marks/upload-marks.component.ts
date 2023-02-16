import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentService } from 'src/app/services/student/student.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { SubjectsCardComponent } from '../subjects-card/subjects-card.component';

@Component({
  selector: 'app-upload-marks',
  templateUrl: './upload-marks.component.html',
  styleUrls: ['./upload-marks.component.scss']
})
export class UploadMarksComponent implements OnInit {

  filtersForm: FormGroup;
  studentsList: any[] = [];
  subjectsList: any[] = [];
  departmentList: any[] = [];
  examName = '';
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private studentServe: StudentService,
    private subjectServe: SubjectService,
    private departmentServe: DepartmentService,
    private dialog: MatDialog,

  ) {
    this.filtersForm = this.fb.group({
      departmentName: ['', Validators.required],
      year: ['', Validators.required],
      semester: ['', Validators.required],
      exam: ['', Validators.required],
    })
  };


  // get students
  async getStudents(): Promise<void> {
    try {
      this.loader.show();
      this.studentsList = await this.studentServe.getStudents(this.filtersForm.value);
      this.getSubjectList();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load');
    } finally {
      this.loader.hide();
    }
  }

  // get subject list
  async getSubjectList(): Promise<void> {
    try {
      this.subjectsList = await this.subjectServe.getDepartmentSubjects(this.filtersForm.value);
    } catch (error) {
      console.log(error);
      this.toast.error('fail to load subjects')
    }
  };
  // get department list
  async getDepartments(): Promise<void> {
    try {
      this.departmentList = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);
    }
  }

  setExamName() {
    const semester = this.filtersForm.value.semester;
    this.examName = `semester-${semester}`
    this.filtersForm.controls['exam'].setValue(this.examName);
  }


  // open marks upload dialog
  openMarksUpload(studentData: any) {
    this.dialog.open(SubjectsCardComponent, {
      data: {
        data: studentData,
        examData: this.filtersForm.value,
        subjects: this.subjectsList
      }
    });
  }

  ngOnInit(): void {
    this.getDepartments();
  }

}
