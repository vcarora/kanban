import { Component, Host, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { LoginService } from '../services/login.service';
import { RouterService } from '../services/router.service';
import { ToggleService } from '../services/toggle.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private token : TokenStorageService, private route : RouterService,private loginService : LoginService, private toggle :ToggleService) {}

  isLoggedIn = false;

  isAdmin = false;

  loginStatus : boolean = false
  

  ngOnInit() : void{
   let user = this.token.getToken();
   if(user){
     console.log(user)
     this.isLoggedIn = true;
   }else 
   this.isLoggedIn =false

   this.loginService.loginStatus.subscribe( (staus)=>{
     this.isLoggedIn = staus
   })
   this.loginService.adminStatus.subscribe( (staus)=>{
    this.isAdmin = staus
  })  

  //window.addEventListener('scroll',this.changeBg)
 } 

 toolbar_variable : boolean = false
 @HostListener('window:scroll',['$event']) scrollFunc(e : Event){
 
    let scrollValue = (e.target as Element).scrollTop  
  if (scrollValue > 20)
  {
    this.toolbar_variable = true
  }
  else
  {
    this.toolbar_variable = false
  }
    
}
 

 logout(): void{
   this.token.logOut()
   this.isLoggedIn = false
   this.route.toHome();

 }

 login():void{
   this.route.toLogin()
 }

 
sideNavToggle(){
 this.toggle.navToggle()
}


}
