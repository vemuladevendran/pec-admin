import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss']
})
export class ViewDepartmentComponent implements OnInit {
  departmentId = '';
  departmentDetails: any;
  firstYear: any[] = [];
  secondYear: any[] = [];
  thirdYear: any[] = [];
  fourthYear: any[] = [];

  classStudentsList = [
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    }
  ]

  constructor(
    private departmentServe: DepartmentService,
    private loader: LoaderService,
    private toast: ToastrService,
    private route: ActivatedRoute
  ) {
    this.departmentId = this.route.snapshot.paramMap.get('id') || '';
  }


  async getDepartmentDetails(): Promise<void> {
    try {
      this.loader.show();
      const data = await this.departmentServe.getDepartmentById(this.departmentId);
      console.log(data);
      this.departmentDetails = data;
      this.firstYear = data?.years?.firstYear;
      this.secondYear = data?.years?.secondYear;
      this.thirdYear = data?.years?.thirdYear;
      this.fourthYear = data?.years?.fourthYear;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load data');
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getDepartmentDetails();
  }

}
