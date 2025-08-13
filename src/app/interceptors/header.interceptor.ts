import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  let service = inject(ApiService)
  const http = inject(HttpClient)
  const snackbar = inject(MatSnackBar)


  
  let newHeader = req.clone({
    url: 'http://localhost:3000/api' + req.url,
    setHeaders: { Authorization: `Bearer ${service.accessToken}` },
    withCredentials: true
  })


  return next(newHeader).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 403) {
        console.log("403 hitted")
        return http.post('/refreshtoken', {}).pipe(
          switchMap((res: any) => {
            console.log(res)
            if (!res.accessToken) {
              localStorage.clear()
              router.navigateByUrl("/")
            }
            service.accessToken = res.accessToken
            let updatedHeader = req.clone({
              url: 'http://localhost:3000/api' + req.url,
              setHeaders: { Authorization: `Bearer ${service.accessToken}` },
              withCredentials: true
            })
            return next(updatedHeader)
          })
        )
      }else if(err.status==401&&err.error.message=="Refresh token required!"){
        localStorage.clear()
        router.navigateByUrl("/")
        snackbar.open("Session timeout please login","dismiss",{horizontalPosition:'center',verticalPosition:"top"})
      }
      return throwError(err)
    })
  );
};
