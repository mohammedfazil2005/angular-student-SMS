import { Component, EventEmitter, Output } from '@angular/core';
import {  MatButtonModule } from '@angular/material/button';
import {  MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addstudent',
  imports: [MatDialogActions,MatDialogContent,MatButtonModule,MatDialogClose,MatInputModule,MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './addstudent.component.html',
  styleUrl: './addstudent.component.css'
})
export class AddstudentComponent {
  studentFormGroup:FormGroup

  @Output() OnAdd =new EventEmitter
  
  constructor(private http:ApiService,private snackbar:MatSnackBar,private FB:FormBuilder){
    this.studentFormGroup=FB.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.required]],
      password:['',[Validators.required]],
    })
  }
 

  addStudent(){
    if(this.studentFormGroup.valid){
      this.http.addStudent(this.studentFormGroup.value).subscribe((res:any)=>{
        this.snackbar.open("Student added","dismiss",{
          horizontalPosition:'center',
          verticalPosition:'top'
        })
   this.studentFormGroup.reset()
   this.OnAdd.emit("student added!")
      })
    }else{
      this.snackbar.open("Please Fill the fornm!","dismiss",{
          horizontalPosition:'center',
          verticalPosition:'top'
        })
    }
  }
  
}
