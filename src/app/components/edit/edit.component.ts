import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit',
  imports: [MatDialogActions,MatDialogContent,MatButton,MatDialogClose,CommonModule,FormsModule,MatInputModule,MatFormFieldModule,],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  userData:any={}
  subArray:any=[]
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private api:ApiService){
    
    this.userData=data.student
    this.subArray=[]
    data.subjects.forEach((each:any)=>{
      this.subArray.push(each.sub)
    })
    this.subArray.forEach((each:any)=>{
      if(!this.userData[each]){
        this.userData[each]=0
      }
    })
    
  }

  onSaveEdit(each:any,mark:any){
    console.log(each)
    if(Number(mark.value)<=0||Number(mark.value)>100){
      return alert("Please enter mark btw 1/100")
    }
    const findSubject=this.data.subjects.find((res:any)=>res.sub==each)
    let newObj={
      studentID:this.userData.rollno,
      subjectID:findSubject.id,
      mark:Number(mark.value)
    }
   this.api.onUpdateMarks(newObj).subscribe({
    next:(res:any)=>{
      alert(res.message)
    },
    error:(error:any)=>{
      alert(error.error.message)
    }
   })
  }


}
