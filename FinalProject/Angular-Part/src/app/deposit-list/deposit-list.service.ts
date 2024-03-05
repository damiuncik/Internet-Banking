import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Deposit} from '../deposit/deposit.model'

@Injectable({
  providedIn: 'root'
})
export class DepositListService {
  private baseUrl = 'http://localhost:8080/api/deposits';

  constructor(private http: HttpClient) { }

  getDepositsForCurrentUser(clientId: number): Observable<Deposit[]> {
    return this.http.get<Deposit[]>(`${this.baseUrl}/client/${clientId}`);
  }
  deleteDepositByDescription(description: string): Observable<void> {
    const params = { description: description };
    return this.http.delete<void>(`${this.baseUrl}`, { params });
  }
  

}

