import { Component, Input } from '@angular/core';
import { task } from '../model/project';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ProjectService } from '../services/project.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {

@Input()
taskList : task[] | undefined =[] 

constructor(private project: ProjectService, private token : TokenStorageService){}

ngOnInit(){
}


drop(event: CdkDragDrop<any[]>, status: string) {
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

}
