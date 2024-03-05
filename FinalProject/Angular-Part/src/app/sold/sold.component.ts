import { Component, ViewChild } from '@angular/core';
import { SoldService } from './sold.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../auth/user.model';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html',
  styleUrls: ['./sold.component.css'],
})
export class SoldComponent {
  @ViewChild('transferForm') transferForm!: NgForm;
  soldAmount: number = 0;

  constructor(private soldService: SoldService, private http: HttpClient) {}

  onSubmitSold(form: NgForm) {
    if (!form.valid) {
      return;
    }
    form.reset();
  }
  onSubmitTransfer(transferForm: NgForm) {
    if (!transferForm.valid) {
      return;
    }

    const amountTransfer: number = transferForm.value.amountTransfer;
    const toWhoTransfer: string = transferForm.value.nameTransfer;

    this.soldService.getUserByUsername(toWhoTransfer).subscribe(
      (receiver: User) => {
        if (receiver && receiver.id) {
          this.addToSomeoneSold(receiver.id, amountTransfer).subscribe(
            () => {
              console.log('Sold amount updated successfully for receiver.');
              const currentUserString = localStorage.getItem('currentUser');
              if (currentUserString) {
                this.extractFromSenderSold(amountTransfer).subscribe(
                  () => {
                    console.log('Sold amount updated successfully for sender.');
                  },
                  (error: any) => {
                    console.error(
                      "Error updating sender's sold amount:",
                      error
                    );
                  }
                );
              }
            },
            (error: any) => {
              console.error("Error updating receiver's sold amount:", error);
            }
          );
        } else {
          console.error('Receiver not found.');
        }
      },
      (error) => {
        console.error('Error finding receiver:', error);
      }
    );
  }

  addToSold(soldAmount: number) {
    if (soldAmount > 0) {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        if (currentUser.id) {
          const clientId = currentUser.id;

          this.http.get(`http://localhost:8080/api/sold/${clientId}`).subscribe(
            (currentSold: any) => {
              const existingAmount = currentSold.amount;
              const newAmount = existingAmount + soldAmount;

              this.updateSoldAmount(clientId, newAmount);
              this.soldAmount = 0;
            },
            (error) => {
              console.error('Error fetching current sold amount:', error);
            }
          );
        } else {
          console.error('Client ID not found in local storage');
        }
      } else {
        console.error('User data not found in local storage');
      }
    } else {
      alert('Invalid amount to add');
    }
  }

  private updateSoldAmount(clientId: number, newAmount: number) {
    const soldData = { amount: newAmount };
    this.http
      .put(`http://localhost:8080/api/sold/${clientId}`, soldData)
      .subscribe(
        (response) => {
          console.log('Sold updated successfully:', response);
        },
        (error) => {
          console.error('Error updating sold:', error);
        }
      );
  }
  extractFromSold(soldAmount: number) {
    if (soldAmount > 0) {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        if (currentUser.id) {
          const clientId = currentUser.id;

          this.http.get(`http://localhost:8080/api/sold/${clientId}`).subscribe(
            (currentSold: any) => {
              const existingAmount = currentSold.amount;

              if (existingAmount >= soldAmount) {
                const newAmount = existingAmount - soldAmount;

                this.updateSoldAmount(clientId, newAmount);
                this.soldAmount = 0;
              } else {
                alert('Insufficient funds.');
              }
            },
            (error) => {
              console.error('Error fetching current sold amount:', error);
            }
          );
        } else {
          console.error('Client ID not found in local storage');
        }
      } else {
        console.error('User data not found in local storage');
      }
    } else {
      alert('Invalid amount to subtract');
    }
  }

  addToSomeoneSold(id: number, amount: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/sold/${id}`).pipe(
      mergeMap((currentSold: any) => {
        const existingAmount = currentSold.amount;

        if (existingAmount >= amount) {
          const newAmount = existingAmount + amount;
          return this.updateSoldAmount2(id, newAmount);
        } else {
          return throwError('Insufficient funds.');
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  extractFromSenderSold(soldAmount: number): Observable<any> {
    if (soldAmount > 0) {
      const currentUserString = localStorage.getItem('currentUser');
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        if (currentUser.id) {
          const clientId = currentUser.id;

          return this.http
            .get(`http://localhost:8080/api/sold/${clientId}`)
            .pipe(
              mergeMap((currentSold: any) => {
                const existingAmount = currentSold.amount;

                if (existingAmount >= soldAmount) {
                  const newAmount = existingAmount - soldAmount;
                  return this.updateSoldAmount2(clientId, newAmount);
                } else {
                  return throwError('Insufficient funds.');
                }
              })
            );
        } else {
          return throwError('Client ID not found in local storage');
        }
      } else {
        return throwError('User data not found in local storage');
      }
    } else {
      return throwError('Invalid amount to subtract');
    }
  }
  private updateSoldAmount2(clientId: number, newAmount: number): Observable<any> {
    const soldData = { amount: newAmount };
  
    return new Observable(observer => {
      this.http.put(`http://localhost:8080/api/sold/${clientId}`, soldData)
        .subscribe(
          (response) => {
            console.log('Sold updated successfully:', response);
            observer.next(response); 
            observer.complete(); 
          },
          (error) => {
            console.error('Error updating sold:', error);
            observer.error(error); 
          }
        );
    });
  }

  onCancel() {
    this.transferForm.resetForm();
  }
}
