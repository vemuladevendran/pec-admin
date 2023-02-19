import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { TimeTableService } from 'src/app/services/time-table/time-table.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.scss']
})
export class AddTimetableComponent implements OnInit {
  timeTableDetails: FormGroup;
  departments: any[] = [];
  sectionList: any[] = [];
  subjectsList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private departmentServe: DepartmentService,
    private subjectsServe: SubjectService,
    private timeTableServe: TimeTableService,
    private toast: ToastrService,
    private loader: LoaderService,
    private router: Router,
  ) {
    this.timeTableDetails = this.fb.group({
      departmentName: ['', Validators.required],
      year: ['', Validators.required],
      section: ['', Validators.required],
      timeTable: this.fb.group({
        monday: this.fb.group({
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
        }),
        tuesday: this.fb.group({
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
        }),
        wednesday: this.fb.group({
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
        }),
        thursday: this.fb.group({
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
        }),
        friday: this.fb.group({
          1: [],
          2: [],
          3: [],
          4: [],
          5: [],
          6: [],
          7: [],
          8: [],
        }),
      })
    })
  }

  // get department
  async getDepartment(): Promise<void> {
    try {
      this.departments = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);

    }
  }

  // get department by id
  // get section list
  async getDepartmentDetails(): Promise<void> {
    try {
      this.loader.show();
      // this condition helps to get department id with the help of department name
      let selectedDepartmentId: any = "";
      const name = this.timeTableDetails.value.departmentName;
      if (name !== '') {
        this.departments.find((x: any) => {
          if (x.departmentName === name) {
            selectedDepartmentId = x.id;
          }
        })
      }
      const data = await this.departmentServe.getDepartmentById(selectedDepartmentId);
      this.sectionList = data.years[this.timeTableDetails.value.year];
    } catch (error) {
      console.log(error);
      this.toast.error('Fali to Load Section');
    } finally {
      this.loader.hide();
    }
  }

  // get subjects
  async getSubjects(): Promise<void> {
    try {
      this.subjectsList = await this.subjectsServe.getSubjects();
    } catch (error) {
      console.log(error);
    }
  }


  // handle table submit

  async handleSubmit(): Promise<void> {
    try {
      this.loader.show();
      const data = this.timeTableDetails.value;
      const result = await this.timeTableServe.createTimeTable(data);
      this.toast.success(result.message);
      this.router.navigate(['/timetable'])
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error.message)
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getDepartment();
    this.getSubjects();
  }


}
