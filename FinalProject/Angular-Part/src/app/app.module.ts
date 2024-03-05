import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { SoldComponent } from './sold/sold.component';
import { DepositComponent } from './deposit/deposit.component';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';
import { SoldAmountComponent } from './sold/sold-amount/sold-amount.component';
import { DepositListComponent } from './deposit-list/deposit-list.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    SoldComponent,
    DepositComponent,
    DepositListComponent,
    LoadingSpinnerComponent,
    SoldAmountComponent,
    DepositListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
