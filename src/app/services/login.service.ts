import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_API = 'http://localhost:9500/';
const Content_API = 'http://localhost:9500/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn : boolean = false;
  

  constructor(private http : HttpClient) {}

   loginStatus = new EventEmitter<any>(); 

  // get isLoggedIn(){
  //   return this.loginStatus.asObservable()
  // }
  register(name: string, email: string, password: string,role:string): Observable<any> {
    return this.http.post(Content_API + 'kanban/register', {
      name,
      email,
      password,
      role
    }, httpOptions);
  }

  login(email : string, password : string): Observable<any>{
    let logginIn : any =  this.http.post(AUTH_API+'employee/login',{email,password},httpOptions);
    console.log("login service : "+logginIn)
    this.isLoggedIn = true
    this.loginStatus.emit(this.isLoggedIn)
    return logginIn;
  }

 
}
