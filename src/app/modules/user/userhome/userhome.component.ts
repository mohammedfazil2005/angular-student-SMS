import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface profileDetails{
  name:string,
  email:string,
  image_url:string
  marks:Array<object>
}

@Component({
  selector: 'app-userhome',
  imports: [CommonModule,MatIconModule,MatButtonModule],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css'
})
export class UserhomeComponent {

  subjects:Array<string>=[]
  profileDetails:profileDetails={
    name:"",
    image_url:'',
    email:"",
    marks:[]
  }

  ngOnInit(){
    // this.getUserDetails()
    this.getAllSubjects()
  }

  constructor(private api :ApiService,private snackbar:MatSnackBar,private router:Router){}

   getAllSubjects(){
    this.api.fetchAllSubjects().subscribe((res:any)=>{
    res.forEach((each:any)=>{
      this.subjects.push(each.sub)
    })
    this.getUserDetails()
    })
    
  }

  getUserDetails(){
    this.api.onGetSingleStudent().subscribe((res:any)=>{
      let newObj:any={}


      newObj['name']=res[0]['name']
      newObj['email']=res[0]['email']
      newObj['image_url']=res[0]['image_url']
      newObj['marks']=[]
     res.forEach((each:any)=>{
      let subObj:any={}
      subObj[each['sub']]=each['mark']
      newObj['marks'].push(subObj)
     })
     

     this.subjects.forEach((each:string)=>{
     if(!newObj['marks'][each]){
       let subObj:any={}
      subObj[each]=0
      newObj['marks'].push(subObj)
     }
     })

     this.profileDetails=newObj

     console.log(this.profileDetails)

   
  })

 

}

getKeys(each:any){
  let subject=Object.keys(each)[0]
  let values=Object.values(each)[0]
  let obj={key:subject,value:values}

  return obj
}
logout(){
  sessionStorage.clear()
  this.snackbar.open("Logged out","dismiss",{horizontalPosition:"center",verticalPosition:"top"})
  this.router.navigateByUrl("/")
}

}