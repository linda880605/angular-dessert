import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DessertComponent } from './dessert/dessert.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { Checkout1Component } from './checkout1/checkout1.component';
import { Checkout2Component } from './checkout2/checkout2.component';
import { Checkout3Component } from './checkout3/checkout3.component';
import { SuccessComponent } from './success/success.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dessert', component: DessertComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout1', component: Checkout1Component },
  { path: 'checkout2', component: Checkout2Component },
  { path: 'checkout3', component: Checkout3Component },
  { path: 'success', component: SuccessComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
