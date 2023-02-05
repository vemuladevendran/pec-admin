import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings/settings.service';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { lastValueFrom } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService,
    private router: Router,
    private token: TokenService
  ) { }


  adminLogin(data: any){
    const url = `${this.settings.API_BASE_URL}/admin/login`;
    return lastValueFrom(this.http.post(url, data));
  }

  isLoggedIn() {
    return this.token.isTokenExist();
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }

}
