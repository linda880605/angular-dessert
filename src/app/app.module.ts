import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DessertComponent } from './dessert/dessert.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ShipComponent } from './ship/ship.component';
import { PayComponent } from './pay/pay.component';
import { ReceiptComponent } from './receipt/receipt.component';
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
    ShipComponent,
    PayComponent,
    ReceiptComponent,
    SuccessComponent,
    DetailComponent,
    BlockComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
