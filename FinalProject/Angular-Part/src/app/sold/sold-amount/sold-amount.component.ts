import { Component, OnInit } from '@angular/core';
import { SoldService } from '../sold.service';

@Component({
  selector: 'app-sold-amount',
  templateUrl: './sold-amount.component.html',
  styleUrls: ['./sold-amount.component.css']
})
export class SoldAmountComponent implements OnInit{
  clientSold !: number;
  clientId !: number;

  constructor(private soldService : SoldService){}

  ngOnInit(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.clientId = currentUser .id || 0; 

    this.loadSoldAmount(this.clientId);
  }

  loadSoldAmount(clientId: number){
    this.soldService.getSoldByUserId(clientId).subscribe((currentUser) => {
      this.clientSold = currentUser.amount || 0;
    })
  }
}
