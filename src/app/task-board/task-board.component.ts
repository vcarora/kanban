import { Component, Input } from '@angular/core';
import { task } from '../model/project';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {

@Input()
taskList : task[] | undefined =[] 

}
