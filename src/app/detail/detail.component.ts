import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheckService } from './../check.service';
import { DESSERT } from '../mock-dessert';
import { Dessert } from '../dessert';
import { Kind } from '../dessert/dessert.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnChanges {

  @Input() selectType: Kind;

  // desserts = DESSERT;
  desserts: any;
  type: string;
  typeDetail: object;

  constructor(
    private http: HttpClient,
    private checkService: CheckService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const select = changes.selectType.currentValue;
    console.log('選擇的種類 = ' + select);
    this.selectType = select;
    if (select === 0) {
      this.getAllProducts();
    }
    else {
      this.queryTypeAndNums();
      this.queryByTypeId(select);
    }
  }

  changeQuantity4select(dessert: any): void {
    // 需要參數userEmail productName quantity
    const userEmail = this.checkService.getUserEmail();
    const productName = dessert.name;
    const quantity = '1';
    console.log(productName);
    if (userEmail === '') {
      alert('尚未登入');
    }
    else {
      const body = new HttpParams()
        .set('userEmail', userEmail)
        .set('productName', productName)
        .set('quantity', quantity);
      const url = '/api/changeQuantity4select';
      this.http.post(url, body).subscribe(
        res => {
          alert('已加入購物車');
        },
        error => {
          console.log('error:', error);
          alert('網頁發生錯誤 請立即聯絡我們 將由專人為您處理');
        }
      );
    }
  }

  getAllProducts(): void { // 所有甜點
    // Return 所有產品 (名稱、價格、圖片、id、庫存)
    const url = '/api/getAllProducts';
    this.http.get(url).subscribe(
      res => {
        this.desserts = res; // 回傳物件陣列
        console.log(this.desserts);
        // console.log(this.desserts[0].id);
        // console.log(this.desserts[0].name);
        // console.log(this.desserts[0].price);
        // console.log(this.desserts[0].inventories);
        // console.log(this.desserts[0].img);
      },
      error => {
        console.log('error:', error);
        alert('網頁發生錯誤 請立即聯絡我們 將由專人為您處理');
      }
    );
  }

  queryTypeAndNums(): void { // 甜點類別
    // Return 所有類別細節(名稱、狀態、數量、id)
    const url = '/api/queryTypeAndNums';
    this.http.get(url).subscribe(
      res => {
        console.log(res); // 回傳物件陣列
        this.typeDetail = res;
        // console.log(this.typeDetail[0].type_id);
        // console.log(this.typeDetail[0].chinese);
        // console.log(this.typeDetail[0].status);
      },
      error => {
        console.log('error:', error);
        alert('網頁發生錯誤 請立即聯絡我們 將由專人為您處理');
      }
    );
  }

  queryByTypeId(kind: Kind): void { // 某類別的甜點有哪些
    // 需要參數typeId
    const typeId = kind.toString();
    const body = new HttpParams()
      .set('typeId', typeId);
    const url = '/api/queryByTypeId';
    this.http.post(url, body).subscribe(
      res => {
        // return 該類產品
        this.desserts = res; // 回傳物件陣列
        console.log(this.desserts);
        // console.log(this.desserts[0].id);
        // console.log(this.desserts[0].name);
        // console.log(this.desserts[0].price);
        // console.log(this.desserts[0].inventories);
        // console.log(this.desserts[0].img);
      },
      error => {
        console.log('error:', error);
        alert('網頁發生錯誤 請立即聯絡我們 將由專人為您處理');
      }
    );
  }

}
