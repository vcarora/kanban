import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RouterService } from 'src/app/services/router.service';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent {

  constructor(private fb : FormBuilder, private project : ProjectService, private router : RouterService){}

  
  projectForm = this.fb.group({
    name : ['',[Validators.required,Validators.minLength(5)]],
    description : ['',[Validators.required]],
    start: new FormControl<Date | null>(null),
    duration: new FormControl<Date | null>(null),
  })

  get name(){return this.projectForm.get("name");}
  get description(){return this.projectForm.get("description");}
  get duration(){return this.projectForm.get('duration')}

  time(){
 
    console.log(this.projectForm.value)
    this.project.createProject(this.projectForm.value).subscribe({
      next : data=>{
        console.log(data)
      }
    })
    this.router.toDashboard()
}
}
