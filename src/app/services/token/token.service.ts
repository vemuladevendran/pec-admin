import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey = 'AUTH_TOKEN';

  constructor() { }

  saveToken(data: any) {
    localStorage.setItem(this.tokenKey, data);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }


  isTokenExist() {
    return !!this.getToken();
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
