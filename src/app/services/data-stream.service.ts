import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { project, task, user } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class DataStreamService {

  private SorcetimeLine = new BehaviorSubject<number>(0);
  currentTimeLine = this.SorcetimeLine.asObservable()
  private sorceProject = new BehaviorSubject<project>({});
  currentProject = this.sorceProject.asObservable()
  private sorceMembers = new BehaviorSubject<Array<user>>([])
  currebtMembers = this.sorceMembers.asObservable()

  constructor() { }

  changeDuration(duration:number){
    this.SorcetimeLine.next(duration)
  }

  changeProject(project:project){
    this.sorceProject.next(project)
  }

  changeTask(task: any){
    this.sorceProject.next(task);
  }
  changeMembers(members:user[]){
    this.sorceMembers.next(members)
  }
}
