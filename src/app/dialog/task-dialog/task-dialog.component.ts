import { Component, Inject } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { task, user } from '../../model/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {

  formData : task = {
    status:'TO DO'
  }

  emails:user[] = [];
  projectDetail : any ={}

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private project : ProjectService) {}

    priorities : string[]=['Low','Moderate','High']
    statuses : string[] =['TO DO','In Progress']

    ngOnInit() {
      // will log the entire data object
      console.log(this.data.project_id)
      console.log(this.data.emailList)
      this.emails=this.data.emailList;
    }

  addTask(task : NgForm){
    //  
    console.log(task.value)
    this.project.addTask(this.data.project_id,task.value).subscribe({
      next : data=>{
        console.log(data)
      //  this.getUpdatedProjectDetails()

      }
    })

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getUpdatedProjectDetails(){
    this.project.getProjectById().subscribe({
      next: data =>{
        console.log(data)
        this.projectDetail = data
      }
    })
  }
}
