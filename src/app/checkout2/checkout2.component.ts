import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CheckService } from './../check.service';
import { CartService } from './../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['./checkout2.component.css']
})
export class Checkout2Component implements OnInit {

  desserts: any;
  money = 0; // 商品價錢
  fee = 0; // 運費
  total = 0; // 總額
  pq = 0;

  card = ''; // 信用卡卡號
  surName = '';
  name = '';
  three = ''; // 背後末三碼
  tag = false;

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
    if (this.card.match(/[\D]-/)) {
      alert('卡號請輸入數字');
      this.card = '';
      this.tag = false;
    }
    if (this.card.length === 4 || this.card.length === 9 || this.card.length === 14) {
      this.card += '-';
    }
    if (this.card.length > 19) {
      alert('信用卡卡號只有20碼 請重新輸入');
      this.card = '';
      this.tag = false;
    }
    if (this.three.match(/[\D]/)) {
      alert('末三碼請輸入數字');
      this.three = '';
      this.tag = false;
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      (<HTMLInputElement> document.getElementById('three')).value = '';
    }
    if (this.three.length > 3) {
      alert('大於三碼 請重新輸入');
      this.three = '';
      this.tag = false;
    }
  }

  go(): void {
    if (this.card.length < 19) {
      alert('信用卡卡號填寫未完整 請重新輸入');
      this.card = '';
      this.tag = false;
    }
    if (this.three.length < 3) {
      alert('卡片背後末三碼填寫未完整 請重新輸入');
      this.three = '';
      this.tag = false;
    }
    if (this.name === '' || this.surName === '') {
      alert('填寫未完整');
      this.tag = false;
    }
    if (this.tag) {
      this.router.navigate(['../checkout3']);
    }
  }

}
