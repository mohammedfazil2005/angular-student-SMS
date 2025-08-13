import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddstudentComponent } from '../addstudent/addstudent.component';
import { AddsubjectComponent } from '../addsubject/addsubject.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() onRefresh =new EventEmitter
  
  constructor(private dialog:MatDialog,private router:Router,private snackBar:MatSnackBar,private api:ApiService){}
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
  logout(){
    this.api.onLogout().subscribe(()=>{
      localStorage.clear()
        sessionStorage.clear()
  this.snackBar.open("Logged out","dismiss",{horizontalPosition:"center",verticalPosition:"top"})
  this.router.navigateByUrl("/")
    })

}
}
