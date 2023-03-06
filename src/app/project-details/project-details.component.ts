import { JsonpInterceptor } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMemberDialogComponent } from '../dialog/add-member-dialog/add-member-dialog.component';
import { project, task } from '../model/project';
import { ProjectService } from '../services/project.service';
import { TokenStorageService } from '../services/token-storage.service';
import { TaskDialogComponent } from '../dialog/task-dialog/task-dialog.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {

  @Input()
  projectDetails : project = {}

  constructor(public dialog : MatDialog, private project : ProjectService, private token : TokenStorageService){}

  task : task ={}


  ngOnInit(){
   
  }
  

  taskDialog():  void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {project_id: this.projectDetails?.project_id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.task = result;
      console.log("tl :: "+this.task)
    });
  }

  email : string = ''
  addMember(): void{
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      data: {project_id: this.projectDetails?.project_id,email : this.email},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
      console.log("tl :: "+this.email)
      if(this.email != null && this.email.length > 3){
        this.project.assignMember(this.projectDetails?.project_id,this.email).subscribe({
          next: data=>{
            console.log(data)
          }
        })
      }
    });


  }

  deleteProject(){
    let userSelection =  confirm('The Project will get deleted.\n It cannot be restored again')
    let project_id : number = this.token.getProjectId()
    if(userSelection){
     this.project.deleteProject(project_id).subscribe(
       response =>{
         console.log("deleted")
        // window.location.reload()
       })
      }
      
  }

  

  
}
