import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CheckService } from './../check.service';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  desserts: any;
  money = 0; // 商品價錢
  fee = 0; // 運費
  total = 0; // 總額

  constructor(
    private http: HttpClient,
    private checkService: CheckService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.checkCart();
  }

  changeQuantity(dessert: any, count: number): void {
    let check = true;
    const userEmail = this.checkService.getUserEmail();
    const productName = dessert.NAME;

    let quantity = '0';
    if (count === 1) {
      quantity = '1';
    }
    else {
      quantity = '-1';
      if (dessert.order_quantity === 1) {
        alert('數量不得小於1');
        check = false;
      }
    }
    if (check) {
      const body = new HttpParams()
        .set('userEmail', userEmail)
        .set('productName', productName)
        .set('quantity', quantity.toString());
      const url = '/api/changeQuantity4select';
      this.http.post(url, body).subscribe(res => {
        console.log(res);
        this.checkCart();
      });
    }
  }

  deleteCart(dessert: any): void {
    const userEmail = this.checkService.getUserEmail();
    const productName = dessert.NAME;
    console.log(productName);
    const url = `/api/cart/${userEmail}/${productName}`;
    this.http.delete(url).subscribe(res => {
      this.checkCart();
    });
  }


  checkCart(): void {
    // 需傳參數@RequestHeader String token
    const token = this.checkService.getToken();
    const body = new HttpParams()
      .set('token', token);
    const url = '/api/checkCart';
    this.http.post(url, body, {
      // tslint:disable-next-line: object-literal-shorthand
      headers: { token: token }
    }).subscribe(res => {
      console.log(res);
      this.money = 0;
      this.desserts = res;

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.desserts.length; i++) {
        // this.desserts[i].pq 商品價錢*數量 單一商品總額
        this.desserts[i].pq = this.desserts[i].price * this.desserts[i].order_quantity;
        this.money += this.desserts[i].pq; // 計算全部商品的總額
      }
      console.log('價錢 = ' + this.money);
      this.cartService.setMoney(this.money);
      this.cartService.setList(this.desserts);
      this.fee = this.cartService.getFee();
      this.total = this.cartService.getTotal();
      console.log('價錢service total  = ' + this.total);
    });
  }

}
