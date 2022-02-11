import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  departments: string[] = ['IT', 'CSE', 'ECE', 'EEE', 'MECH'];
  createAdmin: FormGroup
  constructor(
    private fb: FormBuilder,
    private adminServe: AdminService,
  ) {
    this.createAdmin = this.fb.group({
      name: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
      role: ['', [Validators.required]],
      //  department: ['', [Validators.required]],
    })
  }

  async handleSubmit(): Promise<void> {
    try {
      const data = this.createAdmin.value;
      await this.adminServe.createAdmin(data);
      console.log(data);
      
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit(): void {
  }

}
