import { JsonpInterceptor } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberDialogComponent } from '../dialog/add-member-dialog/add-member-dialog.component';
import { project, task } from '../model/project';
import { ProjectService } from '../services/project.service';
import { TokenStorageService } from '../services/token-storage.service';
import { TaskDialogComponent } from '../dialog/task-dialog/task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {

  @Input()
  projectDetails : project = {}

  constructor(public dialog : MatDialog, private project : ProjectService, private token : TokenStorageService,
    private snackBar : MatSnackBar){}

  task : task ={}

  userName: string | any ='';

  @Input()
  value: any;

  ngOnInit(){
   this.userName = window.localStorage.getItem("username");
   console.log(this.userName);
   this.userName = this.userName.toUpperCase()  
  }
  
  

  taskDialog():  void {
    if(this.projectDetails.project_id??0 !=0){
      const dialogRef = this.dialog.open(TaskDialogComponent, {
        data: {project_id: this.projectDetails?.project_id, emailList: this.projectDetails.assigned_emp},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.task = result;
        console.log("tl :: "+this.task)
      });
    }else{
      this.snackBar.open('Please select project before adding task !!','', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
    
  }

  email : string = ''
  addMember(): void{
    if(this.projectDetails.project_id??0 !=0){
      const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      data: {project_id: this.projectDetails?.project_id,email : this.email},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
      console.log("tl :: "+this.email)
      if(this.email != null && this.email.length>10){
        this.project.assignMember(this.projectDetails.project_id,this.email).subscribe({
          next: data=>{
            console.log(data)
          },error: err=>{
            this.snackBar.open('Failed to Invite Member. Please enter only registered member email !!', 'Ok', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        })
      }
    });
    }else{
      this.snackBar.open('Please select project before adding members !!','', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }

  deleteProject(){
    let project_id : number = this.projectDetails.project_id ?? 0;
    console.log(project_id)
    if(project_id == 0){
      this.snackBar.open('Please select project before deleting !!','', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }else{
      let userSelection =  confirm(this.projectDetails.name+' Project will get deleted'+'.\n It cannot be restored again')
      if(userSelection){
        this.project.deleteProject(project_id).subscribe(
          response =>{
            console.log("deleted")
        // window.location.reload()
       })
      }
    } 
  }

}
