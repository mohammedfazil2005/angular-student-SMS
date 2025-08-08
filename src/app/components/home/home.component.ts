import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from "../header/header.component";
import { EditComponent } from '../edit/edit.component';
import {MatTableModule} from '@angular/material/table';
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  imports: [MatButtonModule, CommonModule, MatIconModule, HeaderComponent, MatTableModule, MatExpansionModule,MatInputModule,FormsModule,CdkDropList,CdkDrag,DragDropModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   



  displayColumn: any = []
  dataSource: any = []
  editData: any = {}
  dummySubjects: any = []
  isOpenedExpansions:any=[]


  ngOnInit() {
    this.getSubjects()
    this.getStudentDetails()

  }

  constructor(private api: ApiService,private snackBar:MatSnackBar,private router:Router) { }


  getSubjects() {
    this.api.fetchAllSubjects().subscribe((res: any) => {
      this.displayColumn = ['rollno', 'name']
      this.dummySubjects = []
      res.forEach((each: any) => {
        this.dummySubjects.push(each)
        this.displayColumn.push(each.sub)
      })
      this.displayColumn.push("actions")

    })
  }

  getStudentDetails() {
    this.api.fetchStudents().subscribe((res: any) => {
      const processedData: any[] = [];
      console.log(res)
      res.forEach((each: any) => {
        let existing = processedData.find((item: any) => item.rollno === each.rollno);
        if (existing) {
          existing[each.sub] = each.mark;
        } else {
          const newObj: any = {
            rollno: each.rollno,
            name: each.name,
          };
          newObj[each['sub']] = each.mark
          processedData.push(newObj);
        }
      });

      this.dataSource = processedData;
      // console.log(this.dataSource);
    });
  }


  editStudent(student: any) {
    let studentData=student
    this.dummySubjects.forEach((each:any)=>{
      if(!studentData[each.sub]){
        studentData[each.sub]=0
      }
    })
    this.editData=studentData

    
   
    this.isOpenedExpansions=this.isOpenedExpansions==student?null:student

  }

  deleteStudent(student: any) {
    console.log(student)
    this.api.onDeleteStudent(student.rollno).subscribe({
      next: () => {
        this.snackBar.open("Student removed","dismiss",{
          horizontalPosition:'center',
          verticalPosition:'top',
          panelClass:'success-snackbar'
        })
        this.getStudentDetails()
      }

    })

  }

  onStudentAdded() {
    console.log("Student Added")
    this.getStudentDetails()
    this.getSubjects()
  }

  deleteSubject(subject:any){
    let findSub=this.dummySubjects.find((each:any)=>each.sub==subject)
    if(findSub){
      this.api.onDeleteSubjects(findSub.id).subscribe({
        next:(res:any)=>{
          this.snackBar.open(res.message,"dismiss",{
            horizontalPosition:'center',
            verticalPosition:'top'
          })
          this.getStudentDetails()
          this.getSubjects()
          setTimeout(()=>{
          this.snackBar.dismiss()
         },2000)
        },
        error:(reason:any)=>{
          alert(reason.error.message)
        }
      })
    }
  }

  logData(row:any){
    console.log(row)
  }
  
  onUpdateStudent(data:any){
    // console.log(data)
    let obj=[]
    for(let eachObj in data){
      if(eachObj=="rollno"||eachObj=="name"||eachObj=="null"){
        continue;
      }else{
       let findSubId=this.dummySubjects.find((each:any)=>each.sub==eachObj)

       let newObj={
        studentID:this.editData.rollno,
        subjectID:findSubId.id,
        mark:data[eachObj]
       }
      if(newObj.mark>0&&newObj.mark<=100){
        obj.push(newObj)
      }
      }
    }
    console.log(obj)
    this.api.onUpdateMarks(obj).subscribe({
      next:(res:any)=>{
        this.snackBar.open(res.message,"dismiss",{
          horizontalPosition:"center",
          verticalPosition:"top"
        })
      }
    })

   
  }

  drop(event:CdkDragDrop<string[]>){
    // console.log(event)
    console.log("trii")

    let fixedColumns=['rollno','name','actions']
    
    if(fixedColumns.includes( this.displayColumn[event.previousIndex])||fixedColumns.includes(this.displayColumn[event.currentIndex])){
      return;
    }



    moveItemInArray(this.displayColumn,event.previousIndex,event.currentIndex)
    
  }

  onViewClick(id:number){
    this.router.navigateByUrl(`/editprofile/${id}`)
}


}

