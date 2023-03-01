import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InterceptorService } from './services/interceptor.service';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProjectDialogComponent } from './dialog/project-dialog/project-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TaskDialogComponent } from './dialog/task-dialog/task-dialog.component';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { AddMemberDialogComponent } from './dialog/add-member-dialog/add-member-dialog.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule,MatCardHeader} from '@angular/material/card';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskCardComponent } from './task-card/task-card.component'

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    ProjectDialogComponent,
    ProjectDetailsComponent,
    TaskDialogComponent,
    AddMemberDialogComponent,
    TaskBoardComponent,
    TaskCardComponent,


    NavBarComponent,
    HomeComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatRadioModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,

    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ScrollingModule,

    MatCardModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass: InterceptorService,multi:true},MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
