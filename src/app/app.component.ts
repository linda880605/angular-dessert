import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dessert';
  data: any;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() { }

}
