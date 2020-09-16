import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CartService } from './../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout1',
  templateUrl: './checkout1.component.html',
  styleUrls: ['./checkout1.component.css']
})
export class Checkout1Component implements OnInit {

  desserts: any;
  money = 0; // 商品價錢
  fee = 0; // 運費
  total = 0; // 總額
  pq = 0; // 單一商品總額

  surName = '';
  name = '';
  phone = '';
  tag = true;

  constructor(
    private http: HttpClient,
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
    if (this.surName.match(/[\d]/)) {
      alert('姓氏不能輸入數字 請重新輸入');
      this.surName = '';
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      (<HTMLInputElement> document.getElementById('surName')).value = '';
      this.tag = false;
    }
    if (this.name.match(/[\d]/)) {
      alert('名字不能輸入數字 請重新輸入');
      this.name = '';
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      (<HTMLInputElement> document.getElementById('name')).value = '';
      this.tag = false;
    }
    if (this.phone.match(/[\D]-/)) {
      console.log(this.phone.match(/[\D]-/));
      alert('電話請輸入數字');
      this.phone = '';
      this.tag = false;
    }
    if (this.phone.length === 4 || this.phone.length === 8) {
      this.phone += '-';
    }
    if (this.phone.length > 12) {
      alert('電話號碼只有10碼 請重新輸入');
      this.phone = '';
      this.tag = false;
    }
  }

  go(): void {
    if (this.phone.length < 12 || this.phone === '' || this.name === '' || this.surName === '') {
      alert('填寫未完整');
      this.tag = false;
    }
    if (this.tag) {
      this.router.navigate(['../checkout2']);
    }
  }

}
