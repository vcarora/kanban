import { Component } from '@angular/core';

@Component({
  selector: 'app-pricings',
  templateUrl: './pricings.component.html',
  styleUrls: ['./pricings.component.css']
})
export class PricingsComponent {


  name: any;

  ngOnInit(): void{
    this.name = window.localStorage.getItem('username');
  }
}
