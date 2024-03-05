import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepositService } from './deposit.service';
import { Deposit } from '../deposit/deposit.model';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {
  depositAmount: number = 0;
  depositDescription: string = '';

  constructor(private depositService: DepositService) {}

  onSubmitDeposit(form: NgForm) {
    const depositAmount: number = form.value.depositAmount;
    const depositDescription: string = form.value.depositDescription;
    const currentUserString = localStorage.getItem('currentUser');
  
    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      const clientId: number = currentUser.id;
  
      const deposit: Deposit = {
        client_id: clientId,
        amount: depositAmount,
        description: depositDescription
      };
  
      this.depositService.createDeposit(clientId, deposit).subscribe(
        (depositResponse) => {
          console.log('Deposit created successfully:', depositResponse);
        },
        (error) => {
          console.error('Error creating deposit:', error);
        }
      );
    }
    form.reset();
  }
  
}
