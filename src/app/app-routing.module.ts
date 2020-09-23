import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DessertComponent } from './dessert/dessert.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ShipComponent } from './ship/ship.component';
import { PayComponent } from './pay/pay.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { SuccessComponent } from './success/success.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dessert', component: DessertComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'ship', component: ShipComponent },
  { path: 'pay', component: PayComponent },
  { path: 'receipt', component: ReceiptComponent },
  { path: 'success', component: SuccessComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
