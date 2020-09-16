import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DessertComponent } from './dessert/dessert.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { Checkout1Component } from './checkout1/checkout1.component';
import { Checkout2Component } from './checkout2/checkout2.component';
import { Checkout3Component } from './checkout3/checkout3.component';
import { SuccessComponent } from './success/success.component';
import { DetailComponent } from './detail/detail.component';
import { BlockComponent } from './block/block.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DessertComponent,
    LoginComponent,
    CartComponent,
    Checkout1Component,
    Checkout2Component,
    Checkout3Component,
    SuccessComponent,
    DetailComponent,
    BlockComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
