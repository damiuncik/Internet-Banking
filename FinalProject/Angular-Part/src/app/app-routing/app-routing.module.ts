import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../auth/auth.component';
import { SoldComponent } from '../sold/sold.component';
import { DepositComponent } from '../deposit/deposit.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { DepositListComponent } from '../deposit-list/deposit-list.component';


const appRoutes:Routes =[
  { path:'', redirectTo:'/login', pathMatch:'full'},
  {
    path: 'login', 
    component: AuthComponent,
},
  {
    path: 'sold' , 
    component: SoldComponent,
    canActivate:[AuthGuard]},
  {
    path: 'deposit', 
    component: DepositComponent,
    canActivate:[AuthGuard]},
  {
    path: 'deposit-list', 
    component: DepositListComponent,
    canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
