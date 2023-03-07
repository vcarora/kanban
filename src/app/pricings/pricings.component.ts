import { Component, NgZone } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-pricings',
  templateUrl: './pricings.component.html',
  styleUrls: ['./pricings.component.css']
})
export class PricingsComponent {


  name: any = "";
  email: any = '';

  rzp: any;

  constructor(private projectService: ProjectService, private zone: NgZone){}

  ngOnInit(): void{
    this.name = window.localStorage.getItem('username');
    this.email = window.localStorage.getItem('email');
    console.log(this.email);
  }


  razorPayOptions = {
    "key": "rzp_test_T3F42T2BUG0c08",
    "name": "FOKUS",
    "amount": "19999",
    "currency": "INR",
    "description": "PREMIUM PRODUCT",
    "image": "",
    "order_id": "",
    "prefill": {
      "name": this.name,
      "email": this.email,
      "contact": ""
    },
    "theme": {
      "color": "#f54803"
  },
  "handler": this.paymentHandler.bind(this),
  "modal": {
    ondismiss: (() =>{
      window.location.href = "http://localhost:9000/pricing";
    })
  }
  };

  pay(){
    this.rzp = new this.projectService.nativeWindow.Razorpay(this.razorPayOptions);
    this.rzp.open();
  }

  paymentHandler(result: any){
      this.zone.run(() =>{
         window.location.href = "http://localhost:9000/dashboard";
      })
  }
}
