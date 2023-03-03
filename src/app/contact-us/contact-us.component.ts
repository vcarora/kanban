import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { message } from '../model/chat';
import { ChatService } from '../services/chat.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  constructor(private chat : ChatService, private token : TokenStorageService){}

  formData : any ={}

  messages : message[] = []

  email : any =''

  ngOnInit(){

    this.chat.newChat().subscribe({
      next: data=>{
        console.log(data)
      }
    })

    this.getMessage()
    this.email = this.token.getEmail()
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
