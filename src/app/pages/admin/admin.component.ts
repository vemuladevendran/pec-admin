import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  data: any[] = [];
  constructor(
    private adminServe: AdminService,
    private loader: LoaderService,
    private toast: ToastrService
  ) {}

  async getAdminList(): Promise<void> {
    try {
      this.loader.show();
      this.data = await this.adminServe.getAdmins();
      console.log(this.data);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error);
    } finally {
      this.loader.hide();
    }
  }

  async deleteAdmin(id: any): Promise<void> {
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
        await this.adminServe.deleteAdmin(id);
        this.getAdminList();
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('fail to delete');
      }
    }
  }

  ngOnInit(): void {
    this.getAdminList();
  }
}
