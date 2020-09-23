import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DESSERT } from '../mock-dessert';
import { Dessert } from '../dessert';

export enum Kind { // enum的member要全大寫 多字節用底線連接
  ALL = 0,
  DAILY = 1,
  POPULAR = 2,
  NEW = 3,
  OUT = 4
}

@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.css']
})
export class DessertComponent implements OnInit {
  myVar: any;
  desserts = DESSERT;
  selectType: number;
  type: object;
  total = 0;
  kind = Kind; // enum要宣告成member才能使用

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.queryTypeAndNums();
    console.log(Kind.DAILY);
  }

  // onSelect(selectType: number): void { // 只有要賦值可寫在html
  //   this.selectType = selectType;
  // }

  queryTypeAndNums(): void { // 甜點類別
    // Return 所有類別細節(名稱、狀態、數量、id)
    const url = '/api/queryTypeAndNums';
    this.http.get(url).subscribe(
      res => {
        console.log(res);
        this.type = res;
        for (let i = 0; i < 3; i++) {
          this.total += this.type[i].num;
        }
      },
      error => {
        console.log('error:', error);
        alert('網頁發生錯誤 請立即聯絡我們 將由專人為您處理');
      }
    );
  }

}
