import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hide: boolean = true;
  formGroup: FormGroup

  constructor(private FB: FormBuilder, private snackbar: MatSnackBar, private api: ApiService,private router:Router) {
    this.formGroup = this.FB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  onSubmit(event: any) {
    event.preventDefault()
    if (this.formGroup.valid) {

      let data = this.formGroup.value

      this.api.onLogin(data).subscribe({
        next: (res: any) => {
          sessionStorage.setItem("token",res.token)
          sessionStorage.setItem("role",res.role)
          if(res.role!="admin"){
            this.router.navigateByUrl("/users")
          }else{
            this.router.navigateByUrl("/admin")
          }
          this.snackbar.open(res.message, "dismiss", {
            horizontalPosition: "center",
            verticalPosition: 'top'
          })
          setTimeout(() => {
            this.snackbar.dismiss()
          }, 1500)
        },
        error: (reason: any) => {
          this.snackbar.open(reason.error.message, "dismiss", {
            horizontalPosition: "center",
            verticalPosition: 'top'
          })
          setTimeout(() => {
            this.snackbar.dismiss()
          }, 1500)
        }

      })

    } else {
      this.snackbar.open("Please check the form!", "dismiss", {
        horizontalPosition: "center",
        verticalPosition: 'top'
      })
      setTimeout(() => {
        this.snackbar.dismiss()
      }, 1500)
    }
  }



}
