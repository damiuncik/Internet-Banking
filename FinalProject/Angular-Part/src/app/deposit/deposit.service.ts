import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Deposit } from './deposit.model';
import { switchMap,catchError } from 'rxjs/operators';
import { SoldService } from '../sold/sold.service';
import { Sold } from '../sold/sold.model';

const baseUrl = 'http://localhost:8080/api/deposits'; 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class DepositService {
  constructor(private http: HttpClient,
              private soldService: SoldService) { }

  getAllDeposits(): Observable<Deposit[]> {
    return this.http.get<Deposit[]>(baseUrl);
  }

  getDepositById(id: number): Observable<Deposit> {
    return this.http.get<Deposit>(`${baseUrl}/${id}`);
  }

  createDeposit(clientId: number, deposit: Deposit): Observable<Deposit> {
    if (clientId !== null) {
      console.log('Fetching sold amount for client:', clientId);
      return this.soldService.getSoldByUserId(clientId).pipe(
        switchMap((sold: Sold) => {
          if (sold && sold.amount !== undefined) {
            console.log('Fetched sold amount:', sold.amount);
            console.log('The deposit amount:', deposit.amount);
            console.log('The deposit description', deposit.description);
            if (sold.amount > deposit.amount) {
              const newSoldAmount = sold.amount - deposit.amount;
              console.log('New sold amount after deposit:', newSoldAmount);
              return this.http.put(`http://localhost:8080/api/sold/${clientId}`, { amount: newSoldAmount }).pipe(
                switchMap(() => {
                  console.log('Deposit object to be sent:', deposit);
                  return this.http.post<Deposit>(`http://localhost:8080/api/deposits/client/${clientId}`, deposit, httpOptions);
                }),
                catchError((error) => {
                  console.error('Error updating sold amount:', error);
                  return throwError('Error updating sold amount');
                })
              );
            } else {
              throw new Error('Insufficient funds in the client\'s sold amount.');
            }
          } else {
            throw new Error('Sold data or sold.amount is undefined.');
          }
        }),
        catchError((error) => {
          console.error('Error fetching sold amount:', error);
          return throwError('Error fetching sold amount');
        })
      );
    } else {
      throw new Error('Client ID is null.');
    }
  }
  

  updateDeposit(id: number, deposit: Deposit): Observable<Deposit> {
    return this.http.put<Deposit>(`${baseUrl}/${id}`, deposit);
  }

  deleteDeposit(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${id}`);
  }
}
