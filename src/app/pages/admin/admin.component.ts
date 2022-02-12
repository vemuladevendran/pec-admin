import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  data: any[] = [];
  constructor(
    private adminServe: AdminService,
    private loader: LoaderService,
    private toast: ToastrService,

  ) { }


  async getAdminList(): Promise<void> {
    try {
      this.loader.show();
      this.data = await this.adminServe.getAdmins();
      console.log(this.data)
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error)
    }finally{
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getAdminList();
  }

}
