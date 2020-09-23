import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export enum Kind { // enum的member要全大寫 多字節用底線連接
  DAILY = 1,
  POPULAR = 2,
  NEW = 3
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  typeDetail: object;
  products: object;
  selectType: number;
  kind = Kind;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.searchProduct(); // 沒用到的API
  }

  // onSelect(selectType: number): void { // 只有要賦值可寫在html
  //   this.selectType = selectType;
  // }

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
