import { Component, Input } from '@angular/core';
import { task } from '../model/project';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ProjectService } from '../services/project.service';
import { TokenStorageService } from '../services/token-storage.service';
import { DataStreamService } from '../services/data-stream.service';


@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {

@Input()
taskList : task[] | undefined =[] 


creator: any;

isArchiveStatus: any;

archived: boolean = false;

disableDrop = true;

constructor(private project: ProjectService, private token : TokenStorageService, private stream: DataStreamService){}

ngOnInit(){
  this.stream.currentCreator.subscribe( data =>{
    this.creator = data;
  })
  console.log(this.creator);

  this.stream.currentArchive.subscribe( data =>{
    this.isArchiveStatus = data;
  })
}


drop(event: CdkDragDrop<any[]>, status: string) {
  console.log(this.creator); 
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const task = event.container.data[event.currentIndex];
      task.status = status;
      const project_id : number = this.token.getProjectId();
      console.log(project_id);
      this.project.updateTaskStatus(project_id, task).subscribe({
        next: data => {
          console.log(data);
        }
      })
    }
  }

  getTasksByStatus(status: string) {
    return this.taskList?.filter(task => task.status === status);
  }


  canDrop(){
    console.log(this.creator); 
    return this.creator;
  }


}
