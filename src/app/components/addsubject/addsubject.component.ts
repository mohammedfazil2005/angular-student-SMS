import { Component } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import {  MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addsubject',
  imports: [MatDialogActions,MatDialogContent,MatButtonModule,MatDialogClose,MatInputModule,MatFormFieldModule, FormsModule],
  templateUrl: './addsubject.component.html',
  styleUrl: './addsubject.component.css'
})
export class AddsubjectComponent {
  subjectName:string=""

  constructor(private api:ApiService,private snackbar:MatSnackBar){}


  addSubject(){
    if(this.subjectName){
      let body={subject:this.subjectName}
      this.api.onAddSubject(body).subscribe({
        next:(res:any)=>{
          this.snackbar.open(res.message,"dismiss",{
          horizontalPosition:'center',
          verticalPosition:'top'
        })
         this.subjectName=""
         setTimeout(()=>{
          this.snackbar.dismiss()
         },2000)
        },
        error:(res)=>{
          alert(res.error.message)
        }
      })
    }else{
      alert("Please enter subject to add!")
    }
  }

}
