import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const CHAT_API = 'http://localhost:9500/support/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http : HttpClient, private token : TokenStorageService) { }

  newChat() : Observable<any>{
    return this.http.post(CHAT_API+'newChat',httpOptions)
  }

  newMessage(message : any) : Observable<any>{
    let email : any = this.token.getEmail()
    return this.http.post(CHAT_API+'newMessage/support'+email,message,httpOptions)
  }

  newSuportMessage(message : any) : Observable<any>{
    let email : any = this.token.getUserEmail()
    return this.http.post(CHAT_API+'newMessage/support'+email,message,httpOptions)
  }

  getMessages(): Observable<any>{
    let email : any = this.token.getEmail()
    return this.http.get(CHAT_API+'get-messages/support'+email) 
  }
  getMessage(chat_id: any): Observable<any>{
    let email : any = this.token.getEmail()
    return this.http.get(CHAT_API+'get-messages/'+chat_id) 
  }

  getChats(): Observable<any>{
    return this.http.get(CHAT_API+'get-chats')
  }
}
