import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CheckService } from './../check.service';
import { CartService } from './../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout3',
  templateUrl: './checkout3.component.html',
  styleUrls: ['./checkout3.component.css']
})
export class Checkout3Component implements OnInit {

  desserts: any;
  money = 0; // 商品價錢
  fee = 0; // 運費
  total = 0; // 總額
  pq = 0;

  mail = '';
  number = ''; // 電子發票的統編
  number2 = ''; // 郵寄發票的統編
  tag = true;

  constructor(
    private http: HttpClient,
    private checkService: CheckService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.desserts = this.cartService.getList();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.desserts.length; i++) {
      this.desserts[i].pq = this.desserts[i].price * this.desserts[i].order_quantity;
    }
    this.money = this.cartService.getMoney();
    this.fee = this.cartService.getFee();
    this.total = this.cartService.getTotal();
    this.desserts = this.desserts.slice(0, 3); // 頁面只顯示三項商品
  }


  check(): void {
    this.tag = true;
    if (this.number.match(/[\D]/)) {
      alert('統一編號請輸入數字');
      this.number = '';
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      (<HTMLInputElement> document.getElementById('number')).value = '';
      this.tag = false;
    }
  }

  go(): void {
    if (this.mail === '') {
      alert('填寫未完整');
      this.tag = false;
    }
    if (this.tag) {
      this.router.navigate(['../success']);
    }
  }

}
