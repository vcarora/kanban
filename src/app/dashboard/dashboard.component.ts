import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { project } from '../model/project';
import { ProjectDialogComponent } from '../dialog/project-dialog/project-dialog.component';
import { ProjectService } from '../services/project.service';
import { ToggleService } from '../services/toggle.service';
import { TokenStorageService } from '../services/token-storage.service';
import { RouterService } from '../services/router.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private dialog : MatDialog, private project: ProjectService,
    private toggle : ToggleService, private token : TokenStorageService, private router: RouterService, private date: DatePipe){}

  projectsList$ : project[] = []

  value: any;

  assignedProjects : project[] =[];


  selectedProject : project = {}

  showFiller = false;

  totalTask?: number =0

  completedTask: number = 0;

  temp: any;

  sidenav : boolean = false

  badgeValue: any;

  assignedValue: any;

  valueData: boolean = false;

  assignValue: boolean = false;

  ngOnInit(){
    this.assignValue = false;
    this.valueData = false;
    this.getCreatedProjects()
    this.project.RefreshRequired.subscribe(respose=>{
      this.getCreatedProjects()
    })
    this.getAssignedProjects()
    this.project.RefreshRequired.subscribe(respose=>{
      this.getAssignedProjects()
    })


  }

  reload(){
    this.router.toDashboard();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showProjectDetails(project : project){
    
    console.log(this.completedTask);
    this.completedTask = 0;
    this.selectedProject = project;
    console.log(typeof project.duration);
    this.token.saveProjectId(project?.project_id)
    console.log(this.selectedProject)
    this.totalTask = this.selectedProject.taskList?.length ?? 0;

    if(this.totalTask !=0){
      for(let task of this.selectedProject.taskList!){
        console.log(task.status);
          if(task.status === "Completed"){
            console.log("Inside Log");
            this.completedTask=this.completedTask+1;
          }
      }
      console.log(this.completedTask);
       this.temp = 100/this.totalTask!;
       this.value = this.completedTask!*this.temp;
       this.value = this.value.toFixed(0);
    }
    
  }
  

  getCreatedProjects(){
    this.project.getProjects().subscribe({
      next: data =>{
        console.log(data)
        this.projectsList$ = data
        this.badgeValue = this.projectsList$.length;
        console.log(this.projectsList$.length);
        
      }     
    })


  }

  getAssignedProjects(){
    this.project.getAssignedProjects().subscribe({
      next : data=>{
        this.assignedProjects = data
        this.assignedValue = this.assignedProjects.length;
      }
    })
  }

  valueChange(){
    this.valueData = !this.valueData;
  }

  anotherChange(){
    this.assignValue = !this.assignValue;
  }
}
