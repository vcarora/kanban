import { Component, Input } from '@angular/core';
import { task } from '../model/project';
import { ProjectService } from '../services/project.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  constructor(private project :ProjectService, private token : TokenStorageService ){}

  @Input()
  task : task ={}

  formData : task = {}

  statuses : string[] =['TO DO','In Progress','Submitted','Completed']

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
