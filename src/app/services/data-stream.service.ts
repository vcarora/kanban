import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class DataStreamService {

  private SorcetimeLine = new BehaviorSubject<number>(0);
  currentTimeLine = this.SorcetimeLine.asObservable()
  private sorceProject = new BehaviorSubject<project>({});
  currentProject = this.sorceProject.asObservable()

  constructor() { }

  changeDuration(duration:number){
    this.SorcetimeLine.next(duration)
  }

  changeProject(project:project){
    this.sorceProject.next(project)
  }
}
