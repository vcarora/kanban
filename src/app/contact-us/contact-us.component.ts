import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { message } from '../model/chat';
import { ChatService } from '../services/chat.service';
import { LoginService } from '../services/login.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  constructor(private chat : ChatService, private token : TokenStorageService,private login : LoginService){}

  formData : any ={}

  messages : message[] = []

  email : any =''

  isLoggedIn : boolean = false;

  ngOnInit(){

    this.chat.newChat().subscribe({
      next: data=>{
        console.log(data)
      }
    })

    this.getMessage()
    this.email = this.token.getEmail()

    this.login.loginStatus.subscribe((status)=>{
      this.isLoggedIn = status
      console.log(this.isLoggedIn)
    })
  }

  sendMessage(chat : NgForm){
    this.chat.newMessage(chat.value).subscribe({
      next: data=>{
        console.log(data)
      }
    })
  }

  getMessage(){
    this.chat.getMessages().subscribe({
      next : data =>{
        this.messages = data
      }
    })
  }

 

}
