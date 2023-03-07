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
    ogOnInit(){
      this.data.email = null
    }
    filteredOptions:any =[];

    getListOfEmails(){
      if(this.data.email.length >= 3){
        console.log(this.data.email)
        this.project.getEmailsStartWith(this.data.email).subscribe({
          next:list=>{
            if(list != null){
              this.filteredOptions = list
            }else{
              this.filteredOptions = ["no data"]
            }
          }
        })
      }else{
        this.filteredOptions=[]
      }
    }
    onNoClick(): void {

      console.log("close")
      this.dialogRef.close();
    }

}
