import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddstudentComponent } from '../addstudent/addstudent.component';
import { AddsubjectComponent } from '../addsubject/addsubject.component';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() onRefresh =new EventEmitter
  
  constructor(private dialog:MatDialog){}
  openDialog(){
   const dialogRef= this.dialog.open(AddstudentComponent)
    dialogRef.afterClosed().subscribe((res:any)=>{
      this.onRefresh.emit("student added")
    })
  }
  openDialogSubject(){
    const dialogRef=this.dialog.open(AddsubjectComponent)
    dialogRef.afterClosed().subscribe((res)=>{
      this.onRefresh.emit("Subject added!")
    })
  }
}
