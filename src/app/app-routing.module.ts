

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PricingsComponent } from './pricings/pricings.component';
import { RegisterComponent } from './register/register.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { AuthGuard } from './services/auth.guard';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  {path:"",component:HomeComponent },
  {path : "login",component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "home",component: HomeComponent},
  {path: "contact", component: ContactUsComponent},
  {path: "pricing", component: PricingsComponent},
  {path: "support",component: SupportComponent},
  {path: "forgetPassword",component:ForgetPassComponent},
  {path: "reset_password/forget",pathMatch : 'full',component:ResetPassComponent},
  {path : "**",component: NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
