import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { SoldService } from '../sold/sold.service';
import { Router } from '@angular/router';
import { SignData, UserData } from './user.model';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  loginError: string | null = null;
  signupError: string | null = null;
  userData!: UserData;
  signData!: SignData;

  constructor(
    private authService: AuthService,
    private soldService: SoldService,
    private router: Router
  ) {}
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    
    const username = form.value.username;
    const password = form.value.password;
  
    this.isLoading = true;
  
    if (this.isLoginMode) {
      this.authService.login(username, password)
        .subscribe(
          (userData : any) => {
            this.handleLoginSuccess(userData);
          },
          (error) => {
            this.handleLoginError(error);
          }
        );
    } else {
      this.authService.signup(username, password)
        .subscribe(
          (signData : any) => {
            this.handleSignupSuccess(signData);
          },
          (error) => {
            this.handleSignupError(error);
          }
        );
    }
  
    form.reset();
  }
  
  private handleLoginSuccess(userData: UserData) {
    const castedUserData = userData as UserData;
    localStorage.setItem('currentUser', JSON.stringify(castedUserData));
    console.log('Login successful: ', castedUserData);
    this.isLoading = false;
    this.router.navigate(['/sold']);
    this.fetchUserSold(castedUserData.id);
  } 
  
  private handleLoginError(error: any) {
    if (error.status === 400) {
      this.loginError = 'Invalid username or password.';
    } else {
      this.loginError = 'An error occurred during login. Please try again later.';
    }
    this.isLoading = false;
  }
  
  private handleSignupSuccess(signData: SignData) {
    const castedSignData = signData as SignData; 
    localStorage.setItem('currentUser', JSON.stringify(castedSignData));
    console.log('Signup successful : ', castedSignData);
    this.isLoading = false;
    this.router.navigate(['/sold']);
    const amount = 0;
    this.createSoldItem(amount, castedSignData.id);
  }
  
  
  private handleSignupError(error: any) {
    console.log('Error during signup: ', error);
    if (error.status === 400) {
      this.signupError = 'Username is already taken. Please choose a different one.';
    } else {
      this.signupError = 'An error occurred during signup. Please try again later.';
    }
    this.isLoading = false;
  }
  
  fetchUserSold(userId: number) {
    this.soldService.getSoldByUserId(userId)
      .subscribe(
        (userSold) => {
          console.log('User sold item fetched: ', userSold);
        },
        (error) => {
          console.log('Error fetching user sold item: ', error);
        }
      );
  }
  
  createSoldItem(amount: number, clientId: number) {
    this.soldService.createSold( amount,clientId )
      .subscribe(
        (resData) => {
          console.log('Sold item created: ', resData);
        },
        (error) => {
          console.log('Error creating sold item: ', error);
        }
      );
  }
    
}
