import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { task, user } from 'src/app/model/project';
import { DataStreamService } from 'src/app/services/data-stream.service';
import { ProjectService } from 'src/app/services/project.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent {


  constructor(public dialogRef: MatDialogRef<EditComponentComponent>, private project: ProjectService, private token: TokenStorageService, @Inject(MAT_DIALOG_DATA) public data: any, private stream: DataStreamService) { }


  task: task = {}

  formData: task = {}

  emails: user[] = [];

  selectedValue?: string[] = [];

  statuses: string[] = ['TO DO', 'In Progress', 'Submitted', 'Completed']

  ngOnInit() {
    console.log(this.data);
    this.task = this.data
    this.stream.currebtMembers.subscribe((data) => {
      this.emails = data;
      console.log(this.emails);
    })
    if (this.task.memberList != null) {
      for (let values of this.task.memberList!) {
        this.selectedValue?.push(values.email!);
      }
    }
    console.log(this.selectedValue);
  }

  updatedTask() {
    let tempMember: user[] = [];
    for (let temp of this.emails) {
      for (let exVlaue of this.selectedValue!) {
        if (temp.email === exVlaue) {
          tempMember.push(temp);
        }
      }
    }
    console.log(this.selectedValue);
    console.log(tempMember);
    this.task.memberList = [];
    this.task.memberList = tempMember;
    console.log(this.task);

    const project_id: number = this.token.getProjectId()
    this.project.updateTaskStatus(project_id, this.task).subscribe({
      next: data => {
        console.log(data)
      }
    })
    this.dialogRef.close();
  }

  changeStatus(task: task) {
    const project_id: number = this.token.getProjectId()
    this.project.updateTaskStatus(project_id, task).subscribe({
      next: data => {
        console.log(data)
      }
    })
  }
  cancelEdit() {
    this.dialogRef.close();
  }
  isOptionDisabled(opt: any): boolean {
    return this.selectedValue?.length! >= 3 && !this.selectedValue?.find(elm => elm == opt)
  }
}
