import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  departments: string[] = ['IT', 'CSE', 'ECE', 'EEE', 'MECH'];
  createAdmin: FormGroup;
  constructor(
    private fb: FormBuilder,
    private adminServe: AdminService,
    private toast: ToastrService,
    private router: Router,
    private loader: LoaderService
  ) {
    this.createAdmin = this.fb.group({
      name: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      //  department: ['', [Validators.required]],
    });
  }

  async handleSubmit(): Promise<void> {
    try {
      const data = this.createAdmin.value;
      this.loader.show();
      const result = await this.adminServe.createAdmin(data);
      this.toast.success(result);
      this.router.navigate(['/admin']);
    } catch (error: any) {
      console.error(error);
      this.toast.error(error.error);
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {}
}
