import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  data: any[] = [];
  constructor(
    private adminServe: AdminService
  ) { }


  async getAdminList(): Promise<void> {
    try {
      this.data = await this.adminServe.getAdmins();
      console.log(this.data)
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.getAdminList();
  }

}
