import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PlacementService } from 'src/app/services/placement/placement.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.scss']
})
export class PlacementComponent implements OnInit {

  placementDetails: any[] = [];
  filters = {};
  filtersForm: FormGroup;
  departments: any;
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private placementServe: PlacementService,
    private tokenServe: TokenService,
    private departmentServe: DepartmentService,
  ) {
    this.filtersForm = this.fb.group({
      departmentName: [''],
      jobStatus: [''],
    });
    this.filtersForm.valueChanges.pipe(debounceTime(300))
      .subscribe(() => {
        this.filters = this.filtersForm?.value;
        this.getPlacementDetails(this.filters);
      });
  }


  // get token data

  async getTokenData(): Promise<void> {
    try {
      const tokenData = await this.tokenServe.getTokenData();
      this.filtersForm.controls['departmentName'].setValue(tokenData.department);
    } catch (error) {
      console.log(error);
    }
  }

  // get placement details

  async getPlacementDetails(filters: any): Promise<void> {
    try {
      this.loader.show();
      this.placementDetails = await this.placementServe.getPlacementDetails(filters);
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load');
    } finally {
      this.loader.hide();
    }
  };

  // get department
  async getDepartments(): Promise<void> {
    try {
      this.departments = await this.departmentServe.getDepartmentDetails();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    }
  };


  async updateStatus(id: any, e: any): Promise<void> {
    try {
      this.loader.show();
      await this.placementServe.updateStatus(id, { jobStatus: e.target.value });
      this.getPlacementDetails(this.filters);
      this.toast.info("Status Updated");
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to update status');
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getTokenData();
  }

}
