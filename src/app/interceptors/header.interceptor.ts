import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token=sessionStorage.getItem("token")
  let newHeader=req.clone({
    url:'http://localhost:3000/api'+req.url,
    setHeaders:{Authorization:`Bearer ${token}`}
  })
  console.log(newHeader)
  return next(newHeader);
};
