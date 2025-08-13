import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const snackbar=inject(MatSnackBar)
  let isAdmin=localStorage.getItem("role")
  if(isAdmin=="admin"){
    return true
  }
  router.navigateByUrl('')
  snackbar.open("Unauthorized!","dismiss",{
    horizontalPosition:"center",
    verticalPosition:"top"
  })
  return false 
};
