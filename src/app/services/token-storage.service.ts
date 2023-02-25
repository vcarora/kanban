import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const EMAIL_KEY = 'user-email';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  logOut(): void {
    window.localStorage.clear();

  }

  saveToken(token : string) : void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);


  }
  public getToken(): any {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveEmail(email: string): void {
    window.localStorage.removeItem(EMAIL_KEY);
    window.localStorage.setItem(EMAIL_KEY, email);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      console.log(JSON.parse(user))
      return JSON.parse(user);
    }

    return {};
  }

  public getEmail(): string | null {
    return window.localStorage.getItem(EMAIL_KEY);
  }

}
