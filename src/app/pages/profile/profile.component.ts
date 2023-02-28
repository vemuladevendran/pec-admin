import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: FormGroup;
  hide = false;

  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private profileServe: ProfileService,
    private tokenServe: TokenService,
    ) {
    this.profile = this.fb.group({
      name: ['', [Validators.required]],
      department: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  };


  async profileData():Promise<void>{
    try {
      this.loader.show();
      const data = await this.profileServe.getProfile();
      this.profile.patchValue(data);
      const tokenData = await this.tokenServe.getTokenData();
      this.profile.controls['department'].setValue(tokenData.department);
    } catch (error) {
      console.log(error);
      this.toast.error("Fail to load profile data");
    }finally{
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.profileData();
  }
}
