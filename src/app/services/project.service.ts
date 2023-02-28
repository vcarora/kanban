import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { project, task, user } from '../model/project';

const PROJECT_API = 'http://localhost:9500/kan/project/';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient) { }

  createProject(project : any): Observable<any>{
   return this.http.post(PROJECT_API+'newProject',project);   
  }

  getProjects(): Observable<any>{
    return this.http.get(PROJECT_API+'getProjects')
  }

  addTask(project_id : number|undefined,task : task): Observable<any>{
    return this.http.post(PROJECT_API+'addTask/'+project_id,task)    
  }

  assignMember(project_id :number|undefined,email : string | undefined ): Observable<any>{
    let user : user = {}
    user.email = email
    return this.http.post(PROJECT_API+'assign/'+project_id,user)
  }

  updateTaskStatus(project_id : number ,task : task): Observable<any>{
    return this.http.put(PROJECT_API+'updateTask/'+project_id,task)
  }

  deleteProject(project_id : number) : Observable<any>{
    return this.http.delete(PROJECT_API+'deleteProject/'+project_id)
  }

  deleteTask(project_id : number,task : any) : Observable<any>{
    return this.http.delete(PROJECT_API+'delete/'+project_id,task)
  }
}
