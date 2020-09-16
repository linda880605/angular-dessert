import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CheckService } from './../check.service';
import { DESSERT } from '../mock-dessert';
import { Dessert } from '../dessert';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  @Input() selectType: number;

  // desserts = DESSERT;
  desserts: any;
  type: string;
  typeDetail: any;

  constructor(
    private http: HttpClient,
    private checkService: CheckService
  ) { }

  ngOnInit(): void {
    this.type = '本日精選';
    this.queryByTypeId(1);
  }

  select(num: number) {
    console.log('選擇的種類 = ' + num);
    this.selectType = num;
    this.queryTypeAndNums(num);
    this.queryByTypeId(num);
  }

  queryTypeAndNums(num: number): void { // 甜點類別
    // Return 所有類別細節(名稱、狀態、數量、id)
    const url = '/api/queryTypeAndNums';
    this.http.get(url).subscribe(res => { // 回傳物件陣列
      this.typeDetail = res;
      this.type = this.typeDetail[num - 1].chinese;
    });
  }

  queryByTypeId(num: number): void { // 某類別的甜點有哪些
    // 需要參數typeId
    const typeId = num.toString();
    const body = new HttpParams()
      .set('typeId', typeId);
    const url = '/api/queryByTypeId';
    this.http.post(url, body).subscribe(res => {
      console.log(res);
      this.desserts = res;
    });
  }

  changeQuantity4select(dessert: any) {
    // 需要參數userEmail productName quantity
    const userEmail = this.checkService.getUserEmail();
    const productName = dessert.name;
    if (userEmail === '') {
      alert('尚未登入');
    }
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

}
