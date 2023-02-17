import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SemesterMarksService } from 'src/app/services/semester-exam-marks/semester-marks.service';

@Component({
  selector: 'app-internal-marks',
  templateUrl: './internal-marks.component.html',
  styleUrls: ['./internal-marks.component.scss']
})
export class InternalMarksComponent implements OnInit {
  filters = {};
  marksList: any[] = [];
  departmentList: any[] = [];
  filtersForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    private marksServe: SemesterMarksService,
    private toast: ToastrService,
    private loader: LoaderService,
    private router: Router,
    private departmentServe: DepartmentService,
    private fb: FormBuilder,
  ) {
    this.filtersForm = this.fb.group({
      departmentName: [''],
      year: [''],
      exam: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
    .subscribe(() => {
      this.filters = this.filtersForm?.value
      this.getMarksDetails(this.filters);
    });
  }


  // get marks
  async getMarksDetails(filters: any): Promise<void> {
    try {
      this.loader.show();
      const data = await this.marksServe.getMarks(filters);
      this.marksList = data.data;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch details')
    } finally {
      this.loader.hide();
    }
  }

  // show marks
  showMarks(id: string) {
    this.router.navigate([`exam-marks/internal/details/${id}`])
  }

  async getDepartments(): Promise<void> {
    try {
      this.departmentList = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);

    }
  }

  ngOnInit(): void {
    this.getMarksDetails(this.filters);
    this.getDepartments();
  }

}
