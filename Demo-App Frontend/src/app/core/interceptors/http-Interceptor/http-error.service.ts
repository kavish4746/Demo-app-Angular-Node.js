import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
          catchError(err => {
              console.log(err);
              let errorMessage=`${err.status} : Invalid HTTP Request, Please Try Again !!!`;
              window.alert(errorMessage);
              return throwError("Invalid HTTP Request, Please Try Again !!!");
          })
        );
  }
}
