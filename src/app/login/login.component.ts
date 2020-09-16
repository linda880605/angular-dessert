import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';
import { CheckService } from './../check.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  account: string;
  password: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private checkService: CheckService
  ) { }

  ngOnInit(): void { }

  UserLogin(): void { // 需要參數userEmail和userPw
    // 使用者登入 return token / false
    const userEmail = this.account;
    let userPw = this.password;
    const salt = '!ZaP0#8';
    userPw = Md5.hashStr(userPw + salt).toString();
    const body = new HttpParams()
      .set('userEmail', userEmail)
      .set('userPw', userPw);
    const url = '/api/UserLogin';
    this.http.post(url, body, { responseType: 'text' })
      .subscribe(res => {
        if (res === 'false') {
          alert('帳號或密碼輸入錯誤');
        }
        else {
          this.checkService.setToken(res);
          this.checkService.setUserEmail(userEmail);
          this.router.navigate(['../home']); // 跳轉到首頁
        }
      });
  }

}
