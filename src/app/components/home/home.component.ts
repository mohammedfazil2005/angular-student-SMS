import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from "../header/header.component";
import { EditComponent } from '../edit/edit.component';
import {MatTableModule} from '@angular/material/table';



@Component({
  selector: 'app-home',
  imports: [MatButtonModule, CommonModule, MatIconModule, HeaderComponent,MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  displayColumn: any = []
  dataSource: any = []
  editData: any = {}
  dummySubjects: any = []

  ngOnInit() {
    this.getSubjects()
    this.getStudentDetails()
  }

  constructor(private api: ApiService, private dialog: MatDialog) { }


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
      console.log(this.dataSource);
    });
  }


  editStudent(student: any) {
    let obj = { student: student, subjects: this.dummySubjects }
    const dialogRef = this.dialog.open(EditComponent, {
      data: obj
    })
    dialogRef.afterClosed().subscribe((res)=>{
      this.getStudentDetails()
    })

  }

  deleteStudent(student: any) {
    console.log(student)
    this.api.onDeleteStudent(student.rollno).subscribe({
      next: () => {
        alert("Deleted")
        this.getStudentDetails()
      }

    })

  }

  onStudentAdded() {
    console.log("Student Added")
    this.getStudentDetails()
    this.getSubjects()
  }


}
