import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

  const baseUrl = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    const currentUserString = localStorage.getItem('currentUser');
    return currentUserString !== null;
  }

  signup(username:string, password:string){
    const data = { username, password }
    return  this.http.post(`${baseUrl}/client`,data);
  }

  login(username: string, password: string)  {
    const body = { username, password }; 
  
    return this.http.post(`${baseUrl}/client/login`, body) 
      .pipe(
        catchError((error: any) => {
          let errorMessage = 'An error occurred';
  
          if (error.status === 400) {
            errorMessage = 'Bad request'; 
          } else if (error.status === 404) {
            errorMessage = 'User not found';
          } else if (error.status === 500) {
            errorMessage = 'Internal server error';
          }
  
          console.error(errorMessage, error);
          return throwError(errorMessage);
        })
      );
      
  }
  


}
