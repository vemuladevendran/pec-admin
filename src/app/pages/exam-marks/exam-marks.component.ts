import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SemesterMarksService } from 'src/app/services/semester-exam-marks/semester-marks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-marks',
  templateUrl: './exam-marks.component.html',
  styleUrls: ['./exam-marks.component.scss']
})
export class ExamMarksComponent implements OnInit {
  marksList: any[] = [];
  filters = {};
  filtersForm: FormGroup;
  departmentList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private marksServe: SemesterMarksService,
    private departmentServe: DepartmentService,
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



  // get marks list
  async getMarksDetails(filters: any): Promise<void> {
    try {
      this.loader.show();
      const data = await this.marksServe.getSemesterMarks(filters);
      this.marksList = data?.data;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load');
    } finally {
      this.loader.hide();
    }
  };

  async deleteMarks(id: string): Promise<void> {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        this.loader.show();
        await this.marksServe.deleteMarks(id);
        this.toast.success('Deleted');
        this.getMarksDetails(this.filters);
      } catch (error) {
        console.log(error);
        this.toast.error('Fail to delete');
      } finally {
        this.loader.hide();
      }
    }

  };

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
