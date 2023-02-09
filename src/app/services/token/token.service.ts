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

  async getTokenData(): Promise<any> {
    try {
      const token: any = await this.getToken();
      if (!token) {
        return null;
      }
      return JSON.parse(window.atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }
}
