import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { task } from '../../model/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {

  formData : task = {}

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private project : ProjectService,
    private snackBar: MatSnackBar) {}

    priorities : string[]=['Low','Moderate','High']
    statuses : string[] =['TO DO','In Progress','Submitted','Completed']

    ngOnInit() {
      // will log the entire data object
      console.log(this.data.project_id)
    }

  addTask(task : NgForm){
    //  
    console.log(task)
    console.log(task.value)
    this.project.addTask(this.data.project_id,task.value).subscribe({
      next : data=>{
        console.log(data)
      },error: err=>{
        this.snackBar.open('Failed to Add Task. Please select Project to add task !!', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    })

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
