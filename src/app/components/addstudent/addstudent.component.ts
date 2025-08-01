import { Component, EventEmitter, Output } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import {  MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addstudent',
  imports: [MatDialogActions,MatDialogContent,MatButtonModule,MatDialogClose,MatInputModule,MatFormFieldModule, FormsModule],
  templateUrl: './addstudent.component.html',
  styleUrl: './addstudent.component.css'
})
export class AddstudentComponent {

  @Output() OnAdd =new EventEmitter
  
  constructor(private http:ApiService){}
  studentName:string=""

  addStudent(){
    if(this.studentName){
      let reqBody={name:this.studentName}
      this.http.addStudent(reqBody).subscribe((res:any)=>{
        this.OnAdd.emit("Student added")
        alert(res.message||res.error.message)
      })
    }else{
      alert("Please enter name!")
    }
  }
  
}
