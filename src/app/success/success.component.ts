import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CheckService } from './../check.service';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  desserts: any;

  constructor(
    private http: HttpClient,
    private checkService: CheckService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.checkCart();
  }

  deleteCart(productName: string): void {
    const userEmail = this.checkService.getUserEmail();
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
      this.desserts = res;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.desserts.length; i++) {
        this.deleteCart(this.desserts[i].NAME);
      }
    });
  }

}
