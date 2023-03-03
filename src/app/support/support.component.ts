import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { chatsList,message } from '../model/chat';
import { ChatService } from '../services/chat.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {

  formData : any ={}

  messages : message[] = []

  email : any =''

  chatsList : chatsList[] =[] 

  constructor(private chat : ChatService, private token : TokenStorageService){}

  ngOnInit(){
    this.getChats()
   
  }

  sendMessage(chat : NgForm){
    this.chat.newSuportMessage(chat.value).subscribe({
      next: data=>{
        console.log(data)
      }
    })
  }

  getMessages(chat_id : any){
     this.token.saveUserEmail(chat_id.substring(7))

    setTimeout(()=>{
      this.chat.getMessage(chat_id).subscribe({
        next : data =>{
          this.messages = data
        }
      })
      this.email = this.token.getUserEmail()

    },1000)
   
  }

  getChats(){
    this.chat.getChats().subscribe({
      next:data=>{
        this.chatsList = data
        console.log(this.chatsList[0]?.chat_id.substring(7))
      }
    })
  }
}
