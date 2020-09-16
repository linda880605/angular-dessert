import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheckService } from './../check.service';
import { DESSERT } from '../mock-dessert';
import { Dessert } from '../dessert';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() selectType: number;

  // desserts = DESSERT;
  desserts: any;
  number: number;
  type: string;
  typeDetail: object;

  constructor(
    private http: HttpClient,
    private checkService: CheckService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  changeQuantity4select(dessert: any): void {
    // 需要參數userEmail productName quantity
    const userEmail = this.checkService.getUserEmail();
    const productName = dessert.name;
    console.log(productName);
    const quantity = '1';
    const body = new HttpParams()
      .set('userEmail', userEmail)
      .set('productName', productName)
      .set('quantity', quantity);
    const url = '/api/changeQuantity4select';
    this.http.post(url, body).subscribe(res => {
      alert('已加入購物車');
    });
  }

  select(num: number): void {
    console.log('選擇的種類 = ' + num);
    this.selectType = num;
    if (this.selectType === 0) {
      this.getAllProducts();
    }
    else {
      this.queryTypeAndNums(num);
      this.queryByTypeId(num);
    }
  }

  getAllProducts(): void { // 所有甜點
    // Return 所有產品 (名稱、價格、圖片、id、庫存)
    const url = '/api/getAllProducts';
    this.http.get(url).subscribe(res => {
      this.desserts = res; // 回傳物件陣列
      console.log(this.desserts);
      // console.log(this.desserts[0].id);
      // console.log(this.desserts[0].name);
      // console.log(this.desserts[0].price);
      // console.log(this.desserts[0].inventories);
      // console.log(this.desserts[0].img);
    });
  }

  queryTypeAndNums(num: number): void { // 甜點類別
    // Return 所有類別細節(名稱、狀態、數量、id)
    const url = '/api/queryTypeAndNums';
    this.http.get(url).subscribe(res => {
      console.log(res); // 回傳物件陣列
      this.typeDetail = res;
      // console.log(this.typeDetail[0].type_id);
      // console.log(this.typeDetail[0].chinese);
      // console.log(this.typeDetail[0].status);
    });
  }

  queryByTypeId(num: number): void { // 某類別的甜點有哪些
    // 需要參數typeId
    const typeId = num.toString();
    const body = new HttpParams()
      .set('typeId', typeId);
    const url = '/api/queryByTypeId';
    this.http.post(url, body).subscribe(res => {
      // return 該類產品
      this.desserts = res; // 回傳物件陣列
      console.log(this.desserts);
      // console.log(this.desserts[0].id);
      // console.log(this.desserts[0].name);
      // console.log(this.desserts[0].price);
      // console.log(this.desserts[0].inventories);
      // console.log(this.desserts[0].img);
    });
  }

}
