import { Component } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import {  MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addsubject',
  imports: [MatDialogActions,MatDialogContent,MatButtonModule,MatDialogClose,MatInputModule,MatFormFieldModule, FormsModule],
  templateUrl: './addsubject.component.html',
  styleUrl: './addsubject.component.css'
})
export class AddsubjectComponent {
  subjectName:string=""

  constructor(private api:ApiService){}


  addSubject(){
    if(this.subjectName){
      let body={subject:this.subjectName}
      this.api.onAddSubject(body).subscribe({
        next:(res:any)=>{
          alert(res.message)
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
