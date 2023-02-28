import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.css']
})
export class AddMemberDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private project : ProjectService) {}

    // addMember(){
    //   //  
    //   console.log(task)
    //   console.log(task.value)
    //   this.project.addTask(this.data.project_id,task.value).subscribe({
    //     next : data=>{
    //       console.log(data)
    //     }
    //   })
  
    // }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
