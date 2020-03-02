import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest,HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshing = false;

  constructor(private authService: AuthService ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable <HttpEvent<any>>  {
    //console.log('Intercpting', request);

    if(this.authService.isLogged()){
      request = this.addJwtToken(request);
    }

    return next.handle(request).pipe(
      tap( (event: HttpEvent<any>) => {
        //if (event instanceof HttpResponse) {}
      }, error => {
        if (error instanceof HttpErrorResponse) {

          console.log(error);

          if ( error.status === 401){

            return this.authService.redirectLoginPage();

          }

        }
      })
    );

  }

  addJwtToken(request){
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    });
  }

}

