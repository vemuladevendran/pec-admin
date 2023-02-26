import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departmentList: any[] = [];
  constructor(
    private departmentServe: DepartmentService,
    private loader: LoaderService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  // getting department list
  async getDepartmentList(): Promise<void> {
    try {
      this.loader.show();
      this.departmentList = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);
      this.toast.error('Fali to Load Data');
    } finally {
      this.loader.hide();
    }
  }
  // delete department
  async deleteDepartment(event: any, id: string): Promise<void> {
    event.stopPropagation();
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
        await this.departmentServe.deleteDepartment(id);
        this.getDepartmentList();
      } catch (error) {
        console.log(error);
        this.toast.error('Fali to Delete');
      } finally {
        this.loader.hide();
      }
    }
  }

  updateDepartment(event: any, id: string) {
    event.stopPropagation();
    this.router.navigate([`department/add-department/${id}`])
  }

  ngOnInit(): void {
    this.getDepartmentList();
  }

}
