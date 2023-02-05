import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private authServe: AuthService,
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private tokenServe: TokenService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  async login(): Promise<void> {
    try {
      this.loader.show();
      const data: any = await this.authServe.adminLogin(this.loginForm.value);
      this.tokenServe.saveToken(data?.token);
      this.router.navigate(['/teachers']);
    } catch (error: any) {
      console.error(error);
      this.toast.error(error?.error.message)
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
  }

}
