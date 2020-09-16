import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckService { // 與帳號相關

  token = '';
  userEmail = '';

  constructor() { }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  setUserEmail(userEmail: string): void {
    this.userEmail = userEmail;
  }

  getUserEmail(): string {
    return this.userEmail;
  }
}
