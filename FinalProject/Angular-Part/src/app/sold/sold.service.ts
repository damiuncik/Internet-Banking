import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sold } from "./sold.model";
import { User } from "../auth/user.model";

const baseUrl = 'http://localhost:8080/api/sold'

@Injectable({ providedIn: 'root' })
export class SoldService {
 
    constructor(private http: HttpClient) {}

    getAllSold(): Observable<Sold[]> {
        return this.http.get<Sold[]>(baseUrl);
    }

    getSold(id: any): Observable<Sold> {
        return this.http.get(`${baseUrl}/${id}`); 
    }


    deleteSold(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`); 
    }

    deleteAllSold(): Observable<any> {
        return this.http.delete(baseUrl);
    }

    createSoldForClient(clientId: number, data: any): Observable<any> {
        return this.http.post(`${baseUrl}/client/${clientId}`, data);
    }

    getSoldByUserId(clientId: number): Observable<Sold> {
        return this.http.get<Sold>(`${baseUrl}/${clientId}`);
      }
    
      createSold(amount:number,clientId:number) : Observable<Sold>{
        const sold = {
            clientId,
            amount
        };
        return this.http.post<Sold>(`${baseUrl}/client/${clientId}`, sold);
      }
      
    updateSold(amount: number,clientId:number): Observable<Sold> { 
        const data = { amount,clientId };
    
        return this.http.put(`${baseUrl}/client/${clientId}`,data);
      }

      getUserByUsername(username: string): Observable<User> {
        return this.http.get<User>(`http://localhost:8080/api/client/username/${username}`);
      }      
}
