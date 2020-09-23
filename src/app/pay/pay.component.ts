import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CheckService } from './../check.service';
import { CartService } from './../cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  desserts: any;
  money = 0; // 商品價錢
  fee = 0; // 運費
  total = 0; // 總額
  pq = 0;

  card = ''; // 信用卡卡號
  surName = '';
  Name = '';
  three = ''; // 背後末三碼
  tag = false;

  payForm: FormGroup;

  constructor(
    private http: HttpClient,
    private checkService: CheckService,
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

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

  createForm() {
    this.payForm = this.fb.group({
      cardControl: ['', Validators.pattern('^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}')],
      surNameControl: ['', Validators.pattern('^[\u4e00-\u9fa5]+$|^.[A-Za-z]+$')],
      nameControl: ['', Validators.pattern('^[\u4e00-\u9fa5]+$|^.[A-Za-z]+$')],
      threeControl: ['', Validators.pattern('^[0-9]{3}')],

    });
  }

  get cardId() { return this.payForm.get('cardControl'); }
  get surNameId() { return this.payForm.get('surNameControl'); }
  get nameId() { return this.payForm.get('nameControl'); }
  get threeId() { return this.payForm.get('threeControl'); }

  // check(): void {
  //   this.tag = true;
  //   if (this.surName.match(/[\d]/)) {
  //     alert('姓氏不能輸入數字 請重新輸入');
  //     this.surName = '';
  //     // tslint:disable-next-line: no-angle-bracket-type-assertion
  //     (<HTMLInputElement>document.getElementById('surName')).value = '';
  //     this.tag = false;
  //   }
  //   if (this.name.match(/[\d]/)) {
  //     alert('名字不能輸入數字 請重新輸入');
  //     this.name = '';
  //     // tslint:disable-next-line: no-angle-bracket-type-assertion
  //     (<HTMLInputElement>document.getElementById('name')).value = '';
  //     this.tag = false;
  //   }
  //   if (this.card.match(/[\D]-/)) {
  //     alert('卡號請輸入數字');
  //     this.card = '';
  //     this.tag = false;
  //   }
  //   if (this.card.length === 4 || this.card.length === 9 || this.card.length === 14) {
  //     this.card += '-';
  //   }
  //   if (this.card.length > 19) {
  //     alert('信用卡卡號只有20碼 請重新輸入');
  //     this.card = '';
  //     this.tag = false;
  //   }
  //   if (this.three.match(/[\D]/)) {
  //     alert('末三碼請輸入數字');
  //     this.three = '';
  //     this.tag = false;
  //     // tslint:disable-next-line: no-angle-bracket-type-assertion
  //     (<HTMLInputElement>document.getElementById('three')).value = '';
  //   }
  //   if (this.three.length > 3) {
  //     alert('大於三碼 請重新輸入');
  //     this.three = '';
  //     this.tag = false;
  //   }
  // }

  go(): void {
    this.router.navigate(['../receipt']);
  }

}
