import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let newHeader=req.clone({
    url:'http://localhost:3000/api'+req.url
  })
  return next(newHeader);
};
