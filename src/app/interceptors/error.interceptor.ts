import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req)

};
