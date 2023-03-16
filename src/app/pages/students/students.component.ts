import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentService } from 'src/app/services/student/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  studentsList: any[] = [];
  departments: any[] = [];
  filtersForm: FormGroup;
  filters: any;
  totalCount = 0;
  page: any = 1;

  constructor(
    private studentServe: StudentService,
    private toast: ToastrService,
    private loader: LoaderService,
    private departmentServe: DepartmentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.filtersForm = this.fb.group({
      department: [''],
      year: [''],
      rollNumber: [''],
      studentName: [''],
      examNumber: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.router.navigate(['/students'], { queryParams: { ...this.filtersForm?.value, page: this.page } })
        this.getStudentDetails(this.filters, this.page);
      });
  }



  async getStudentDetails(filters: any, page: any): Promise<void> {
    try {
      this.loader.show();
      const data = await this.studentServe.getStudents(filters, page)
      this.studentsList = data.data;
      this.totalCount = data.count;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to Load')
    } finally {
      this.loader.hide();
    }
  }
  // getting department list
  async getDepartmentList(): Promise<void> {
    try {
      this.departments = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);
      this.toast.error('Fali to Load Department List');
    }
  };

  // delete student
  async deleteStudent(e: any): Promise<void> {
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
        const result = await this.studentServe.deleteStudent(e);
        console.log(result);
        this.toast.info(result);
        this.getStudentDetails(this.filters, this.page);
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('fail to delete')
      }
    }
  }

  // handle page
  handlePage(event: any): void {
    this.page = event.pageIndex + 1;
    this.router.navigate([], {
      queryParams: {
        page: this.page,
      }
    }
    )
    this.getStudentDetails(this.filters, this.page);
  };


  // initial filters
  getInitialFilters(queryFilter: Params): void {
    this.filtersForm.setValue({
      department: queryFilter['department'] || '',
      year: queryFilter['year'] || '',
      rollNumber: queryFilter['rollNumber'] || '',
      studentName: queryFilter['studentName'] || '',
      examNumber: queryFilter['examNumber'] || '',
    });
    this.page = queryFilter['page'] || 1;
  };


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getInitialFilters(params);
    });
    this.getStudentDetails(this.filters, this.page);
    this.getDepartmentList();
  }
}
