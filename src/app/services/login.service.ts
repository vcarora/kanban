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
  isAdmin : boolean = false;
  isPurchaseClick:boolean = false;
  

  constructor(private http : HttpClient) {}

   loginStatus = new EventEmitter<any>(); 
  adminStatus = new EventEmitter<any>();

  // get isLoggedIn(){
  //   return this.loginStatus.asObservable()
  // }
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(Content_API + 'kanban/register', {
      username,
      email,
      password,
      title:"UN-VERIFIED"
    }, httpOptions);
  }

  login(email : string, password : string): Observable<any>{
    let logginIn : any =  this.http.post(AUTH_API+'employee/login',{email,password},httpOptions);
    console.log(logginIn)
    console.log("login service : "+logginIn)
    if(email === 'care.fokus@gmail.com'){
      this.isAdmin = true;
    }else 
    this.isAdmin = false
    this.isLoggedIn = true
    this.loginStatus.emit(this.isLoggedIn)
    this.adminStatus.emit(this.isAdmin)
    return logginIn;
  }
  forgetPassword(email: string){
    return this.http.post(Content_API+'employee/forget_password?email='+email,null,{responseType: 'text'});
  }

  verifyToken(token:string): Observable<any>{
    return this.http.get(Content_API+'employee/reset_password/forget?key='+token)
  }

  resetPass(email:string,password:string,token:string){
    return this.http.post(Content_API+'employee/reset_password/forget?key='+token,{email,password},{responseType: 'text'})
  }
 
  updateTitle(status:string,email:string){
    return this.http.put(Content_API+'kanban/employee/account/upgrade?status='+status+'&email='+email,
                          null,{responseType: 'text'})
  }
}
