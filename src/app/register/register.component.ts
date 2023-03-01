import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { RouterService } from '../services/router.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  result : any;
  errorMessage : any 
  role = null;
  constructor(private fb: FormBuilder,private loginService : LoginService,
    private token : TokenStorageService,
    private route : RouterService, private snackBar : MatSnackBar){}
  

  registerForm = this.fb.group({
    email : ['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    password : ['',[Validators.required,Validators.minLength(8)]],
    name : ['',[Validators.required,Validators.minLength(3)]]
  })

  get email(){return this.registerForm.get("email");}
  get name(){return this.registerForm.get("name");}
  get password(){return this.registerForm.get("password");}

  onRegister() : any{
    // console.log(this.registerForm.value.email)
    // console.log(this.registerForm.value.name)
    // console.log(this.registerForm.value.password)
     let name : any = this.registerForm.value.name
     let email : any = this.registerForm.value.email
     let password : any = this.registerForm.value.password
     this.loginService.register(name,email,password,"user").subscribe({
      next : data =>{   
        console.log(data)
  
        this.loginService.login(email,password).subscribe({
          next: data =>{
            this.token.saveToken(data.token);
            this.token.saveUser(data);
            this.token.saveEmail(data.email);
            this.route.toDashboard()
          }
        })
        

        this.snackBar.open('Registration Successful', 'OK', {
          duration: 3000
        });
      
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
        alert("Registration Failed, Please try after sometime")
      }
     })
  }


}
