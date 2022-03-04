import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(
    private studentServe: StudentService,
    private toast: ToastrService,
    private loader: LoaderService,
    private departmentServe: DepartmentService,
    private fb: FormBuilder,
  ) {
    this.filtersForm = this.fb.group({
      department: [''],
      year: [''],
      rollNumber: [''],
      studentName: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(800))
    .subscribe(() => {
      this.filters = this.filtersForm?.value;
      this.getStudentDetails(this.filters);
    });
  }

  // filters handling
  handleFilterChange(): void {
    this.filters = this.filtersForm?.value;
    this.getStudentDetails(this.filters)
  }


  async getStudentDetails(filters: any): Promise<void> {
    try {
      this.loader.show();
      this.studentsList = await this.studentServe.getStudents(filters);
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
        console.log(e);
        const result = await this.studentServe.deleteStudent(e);
        console.log(result);
        this.toast.info(result);
        this.getStudentDetails(this.filters);
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('fail to delete')
      }
    }
  }

  ngOnInit(): void {
    this.getStudentDetails(this.filters);
    this.getDepartmentList();
  }
}
