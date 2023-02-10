import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-upload-notes',
  templateUrl: './upload-notes.component.html',
  styleUrls: ['./upload-notes.component.scss']
})
export class UploadNotesComponent implements OnInit {
  departmentList: any[] = [];
  uploadForm: FormGroup;
  constructor(
    private departmentServe: DepartmentService,
    private fb: FormBuilder,
    private toast: ToastrService,
  ) {
    this.uploadForm = this.fb.group({

    })
  }


  //  get department list

  async getDepartmentList(): Promise<void> {
    try {
      this.departmentList = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch department list')
    }
  }

  ngOnInit(): void {
    this.getDepartmentList();
  }

}
