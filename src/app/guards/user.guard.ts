import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
const router=inject(Router)
  const snackbar=inject(MatSnackBar)
  let isAdmin=sessionStorage.getItem("role")
  let token=sessionStorage.getItem("token")
  if(isAdmin=="student"&&token){
    return true
  }
  router.navigateByUrl('')
  snackbar.open("Please login again","dismiss",{
    horizontalPosition:"center",
    verticalPosition:"top"
  })
  return false 
};
