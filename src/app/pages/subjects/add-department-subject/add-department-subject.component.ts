import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-add-department-subject',
  templateUrl: './add-department-subject.component.html',
  styleUrls: ['./add-department-subject.component.scss']
})
export class AddDepartmentSubjectComponent implements OnInit {

  subjectForm: FormGroup;
  departmentList: any[] = [];
  subjectList: any[] = [];
  semesterList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private subjectServe: SubjectService,
    private toast: ToastrService,
    private departmentServe: DepartmentService,
    private router: Router,
  ) {
    this.subjectForm = this.fb.group({
      departmentName: ['', Validators.required],
      year: ['', Validators.required],
      subjects: ['', Validators.required],
      semester: ['', Validators.required]
    })
  }



  //  get department list
  async getDepartmentList(): Promise<void> {
    try {
      this.departmentList = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch department list')
    }
  }

  // get subjects list 
  async getSubjectList(): Promise<void> {
    try {
      this.subjectList = await this.subjectServe.getSubjects();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load subjects')
    }
  }

  async handleSubmit(): Promise<void> {
    try {
      await this.subjectServe.createDepartmentSubject(this.subjectForm.value);
      this.router.navigate(['/subjects/department-subject']);
    } catch (error) {
      console.log(error);
      this.toast.error('fail to create');
    }
  }

  // semester list
  handleYearChange(): void {
    const selectedYear = this.subjectForm.value.year;
    switch (selectedYear) {
      case 'firstYear':
        this.semesterList = ['1', '2']
        break;
      case 'secondYear':
        this.semesterList = ['3', '4']
        break;
      case 'thirdYear':
        this.semesterList = ['5', '6']
        break;
      case 'fourthYear':
        this.semesterList = ['7', '8']
        break;
      default:
        this.semesterList = ['1', '2', '3', '4', '5', '6', '7', '8']
        break;
    }
  }

  ngOnInit(): void {
    this.getDepartmentList();
    this.getSubjectList();
  }

}
