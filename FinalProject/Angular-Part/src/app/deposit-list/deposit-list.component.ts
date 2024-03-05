import { Component, OnInit } from '@angular/core';
import { DepositListService } from './deposit-list.service';
import {Deposit} from '../deposit/deposit.model'

@Component({
  selector: 'app-deposit-list',
  templateUrl: './deposit-list.component.html',
  styleUrls: ['./deposit-list.component.css']
})
export class DepositListComponent implements OnInit {
  deposits: Deposit[] = [];
  descriptionToDelete : string ='';


  constructor(private depositService: DepositListService) {}

  ngOnInit(): void {
    this.fetchDeposits();
  }

  fetchDeposits(): void {
    const currentUserString = localStorage.getItem('currentUser');

    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const clientId: number = currentUser.id;

      this.depositService.getDepositsForCurrentUser(clientId).subscribe(
        (deposits: Deposit[]) => {
          this.deposits = deposits;
        },
        (error) => {
          console.error('Error fetching deposits:', error);
        }
      );
    } else {
      console.error('The user is not logged in');
    }
  }
  deleteDepositByDescription(description: string): void {
    this.depositService.deleteDepositByDescription(description).subscribe(
      () => {
        this.fetchDeposits();
        this.descriptionToDelete = '';
      },
      (error) => {
        console.error('Error deleting deposit:', error);
      }
    );
  }
  

}

