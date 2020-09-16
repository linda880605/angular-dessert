import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService { // 與購物車相關

  desserts: any;
  money = 0; // 商品總額
  fee = 60; // 運費
  total = 0; // 合計

  constructor() { }

  setMoney(money: number): void {
    this.money = money;
  }

  getMoney(): number {
    return this.money;
  }

  getFee(): number {
    return this.fee;
  }

  getTotal(): number {
    this.total = this.money + this.fee;
    return this.total;
  }

  setList(desserts: any): void {
    this.desserts = desserts;
  }

  getList(): any {
    return this.desserts;
  }

}
