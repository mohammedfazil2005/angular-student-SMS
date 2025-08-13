import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const snackBar=inject(MatSnackBar)
  const role=localStorage.getItem("role")
  if(role=="admin"){
    router.navigateByUrl('/admin')
    snackBar.open("Unauthorized","dismiss",{
      horizontalPosition:"center",
      verticalPosition:"top"
    })
     return false;
  }else if(role=="student"){
      router.navigateByUrl('/users')
    snackBar.open("Unauthorized","dismiss",{
      horizontalPosition:"center",
      verticalPosition:"top"
    })
     return false;
  }else{
  return true
  }

 
};
