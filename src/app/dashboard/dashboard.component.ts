import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { project } from '../model/project';
import { ProjectDialogComponent } from '../dialog/project-dialog/project-dialog.component';
import { ProjectService } from '../services/project.service';
import { ToggleService } from '../services/toggle.service';
import { TokenStorageService } from '../services/token-storage.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private dialog : MatDialog, private project: ProjectService,
    private toggle : ToggleService, private token : TokenStorageService, private router: RouterService){}

  projectsList$ : project[] = []

  assignedProjects : project[] =[];


  selectedProject : project = {}

  showFiller = false;

  sidenav : boolean = false

  ngOnInit(){

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
    this.selectedProject = project;
    this.token.saveProjectId(project?.project_id)

    console.log(this.selectedProject)
  }
  

  getCreatedProjects(){
    this.project.getProjects().subscribe({
      next: data =>{
        console.log(data)
        this.projectsList$ = data
      }     
    })


  }

  getAssignedProjects(){
    this.project.getAssignedProjects().subscribe({
      next : data=>{
        this.assignedProjects = data
      }
    })
  }
}
