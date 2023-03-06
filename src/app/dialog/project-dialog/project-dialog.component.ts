import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterService } from 'src/app/services/router.service';
import { ProjectService } from '../../services/project.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class ProjectDialogComponent {

  constructor(private fb : FormBuilder, private project : ProjectService, private router : RouterService,
    private snackBar : MatSnackBar){}

  
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
      },error: err=>{
        this.snackBar.open('Failed to Create Project', 'Ok', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    })
    this.router.toDashboard()
}
}
