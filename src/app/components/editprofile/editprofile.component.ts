import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-editprofile',
  imports: [MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit{
  ngOnInit(){
    this.getUserDetails()
  }
  studentData:any=0
  browserDiskStorage:any=0
  constructor(private params:ActivatedRoute,private api:ApiService,public router:Router,private snackbar:MatSnackBar){
    console.log(this.params.snapshot.params['id'])

  }

  getUserDetails(){
    this.api.onGetSingleStudentAdmin(this.params.snapshot.params['id']).subscribe((res:any)=>{
      this.studentData=res[0]
      console.log(this.studentData)
      if(this.studentData.image_url){
        this.browserDiskStorage=this.studentData.image_url
        console.log(this.browserDiskStorage)
      }
    })
  }

  onImageChange(event:any){
 
    const file=event.target.files[0]
    console.log(file)
    const formData=new FormData()
    if(file.type=="image/png"||file.type=="image/jpg"||file.type=="image/jpeg"){
      console.log("trigger")
      this.browserDiskStorage=URL.createObjectURL(file)
   
      formData.append("image",file)
       this.api.onUpdateProfile(this.params.snapshot.params['id'],formData).subscribe({
        next:(reason:any)=>{
          this.snackbar.open(reason.message,"dismiss",{horizontalPosition:'center',verticalPosition:'top'})
             this.getUserDetails()
        },
        error:(res:any)=>{
          this.snackbar.open(res.error.message)
        }
       })
    }else{
      this.snackbar.open("Please select a image with type png,jpg","dismiss",{
        horizontalPosition:"center",
        verticalPosition:"top"
      })
    }
  }






}
