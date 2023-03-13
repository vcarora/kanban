import { Component } from '@angular/core';
import { messageData } from '../model/queries';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent {
  constructor(private queriSend: ChatService) { }
  messagedata: messageData = {
    name: '',
    email: '',
    message: ''
  }

  sendquerie() {
    console.log(this.messagedata)
    if (this.messagedata.name != '' && this.messagedata.email != '' && this.messagedata.message != '') {
      this.queriSend.sendQuerie(this.messagedata).subscribe({
        next: data => {
          this.messagedata.name = ''
      this.messagedata.email = ''
      this.messagedata.message = ''
      this.messagedata.contact = undefined
        },
        error: err => {
        }
      })
    }
  }
}
