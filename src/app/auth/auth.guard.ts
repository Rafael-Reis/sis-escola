import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService){}

  canLoad(route: Route): boolean {

    if(this.authService.isLogged()) {
      return true;
    }

    this.authService.redirectLoginPage(`/${route.path}`);

  }

}
