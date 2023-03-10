import { Component } from '@angular/core';
import { user } from '../model/project';
import { LoginService } from '../services/login.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {


  userDetails: user = {};

  constructor(private token: TokenStorageService, private loginService : LoginService){}

  ngOnInit(){
    let user = this.token.getToken();
    if(user){
      this.loginService.getUserDetails().subscribe({
        next: data =>{
          this.userDetails = data;
          console.log(this.userDetails);
          
        }
      })
    }
  }


  selectChange(event: any){
    if(event.target.files){
      let reader= new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) =>{
        this.userDetails.profile_pic = e.target.result;
      }
     }
  }
}
