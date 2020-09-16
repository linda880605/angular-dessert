import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  typeDetail: object;
  products: object;
  selectType: number;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.searchProduct(); // 沒用到的API
  }

  // searchProduct(): void { // 需傳參數queryString進來
  //   // Return 名稱包含queryString之產品 (名稱、價格、圖片、id、庫存)
  //   const queryString = '蛋糕';
  //   const body = new HttpParams()
  //     .set('queryString', queryString);
  //   const url = '/api/searchProduct';
  //   this.http.post(url, body).subscribe(res => {
  //     // return 該類產品
  //     console.log(res);
  //     this.products = res;
  //     console.log(this.products[0].id);
  //     console.log(this.products[0].name);
  //     console.log(this.products[0].price);
  //     console.log(this.products[0].inventories);
  //     console.log(this.products[0].img);
  //   });
  // }

}
