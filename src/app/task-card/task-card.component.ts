import { Component, Injectable, Input } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { task, user } from '../model/project';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { LoginService } from '../services/login.service';
import { ProjectService } from '../services/project.service';
import { TokenStorageService } from '../services/token-storage.service';


@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  constructor(private project :ProjectService, private token : TokenStorageService, private loginService: LoginService, private emails: DashboardComponent, private projectService: ProjectDetailsComponent){}

  @Input()
  task : task ={}

  formData : task = {}

  userDetails: any;
  isOpen = false;

  visibility: boolean = true;

  statuses : string[] =['TO DO','In Progress','Submitted','Completed']

  members: any = [];


  ngOnInit(){
    this.loginService.getUserFrom(this.task.email).subscribe({
      next: data =>{
        this.userDetails=data;
        console.log(this.userDetails);
      }
    })
    
  }

  changeVisibility(){
    this.visibility = !this.visibility;
  }


  changepriority(data:any){
    const project_id : number = this.token.getProjectId()
    this.isOpen = !this.isOpen
    console.log(data);
    this.task.priority=data;
    console.log(this.task)
    console.log(project_id)
    this.project.updateTaskStatus(project_id,this.task).subscribe({
      next : data=>{
        console.log(data)
      }
    })
  }
  changeStatus(task :task){
    const project_id : number = this.token.getProjectId()

    this.project.updateTaskStatus(project_id,task).subscribe({
      next : data=>{
        console.log(data)
      }
    })

  }

  deleteTask(task : any){
    let userSelection =  confirm('The Project will get deleted.\n It cannot be restored again')
    let project_id : number = this.token.getProjectId()
    if(userSelection){
     this.project.deleteTask(project_id,task).subscribe(
       response =>{
         console.log("deleted")
        // window.location.reload()
       })
      }
  }

 
 
 
 

}
